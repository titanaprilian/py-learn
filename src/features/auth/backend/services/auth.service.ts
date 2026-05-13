import { auth } from "@/features/auth/backend/auth";
import { AuthRepository } from "@/features/auth/backend/repositories/auth.repository";
import { RoleRepository } from "@/features/auth/backend/repositories/role.repository";
import { headers, cookies } from "next/headers"; // Added 'cookies'

export type AuthResult = { success: true; user: unknown } | { error: string };

export class AuthService {
  static async resolveIdentifier(
    identifier: string,
    role: "Mahasiswa" | "Dosen",
  ) {
    const dbUser = await AuthRepository.findByIdentifier(identifier);

    if (!dbUser) {
      return null;
    }

    const roleRecord = await RoleRepository.findByName(role);
    if (!roleRecord) {
      return null;
    }

    if (dbUser.roleId !== roleRecord.id) {
      return null;
    }

    return dbUser;
  }

  static async login(
    identifier: string,
    password: string,
    role: "Mahasiswa" | "Dosen",
  ): Promise<AuthResult> {
    const roleRecord = await RoleRepository.findByName(role);
    if (!roleRecord) {
      return { error: "Invalid role" };
    }

    const dbUser = await AuthRepository.findByIdentifier(identifier);

    if (!dbUser) {
      console.log(
        `Login attempt failed: User with identifier "${identifier}" not found in database.`,
      );
      return { error: "Invalid NIM/NIK atau password" };
    }

    console.log(`User found: ${dbUser.email} (Role ID: ${dbUser.roleId})`);

    if (dbUser.roleId !== roleRecord.id) {
      console.log(
        `Role mismatch: Expected role ID ${roleRecord.id}, got ${dbUser.roleId}`,
      );
      return {
        error: `Akun ini bukan sebagai ${
          role === "Mahasiswa" ? "Mahasiswa" : "Dosen"
        }. Silakan pilih peran yang sesuai.`,
      };
    }

    console.log(`Attempting signInEmail for ${dbUser.email}...`);
    // Call with asResponse: true to get the raw Response object
    const response = await auth.api.signInEmail({
      body: {
        email: dbUser.email,
        password,
      },
      headers: await headers(),
      asResponse: true, // Important: get the raw Response
    });

    // Check if the response was successful
    if (!response.ok) {
      console.error(`signInEmail failed with status: ${response.status}`);
      let errorMessage = "Invalid NIM/NIK atau password";
      try {
        // Attempt to parse error message from response body
        const errorData = await response.json();
        if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        /* Ignore if JSON parsing fails */
      }
      return { error: errorMessage };
    }

    // Manually set the cookie from the response headers
    const setCookieHeaders = response.headers.get("set-cookie"); // May return a single string or null
    if (setCookieHeaders) {
      const cookieStrings = Array.isArray(setCookieHeaders)
        ? setCookieHeaders
        : [setCookieHeaders];

      for (const cookieString of cookieStrings) {
        // Parse the cookie string: "name=value; Option1=Value1; Option2=Value2"
        const parts = cookieString.split(";");
        const [nameValuePart, ...optionsParts] = parts;

        const eqPos = nameValuePart.indexOf("=");
        if (eqPos === -1) continue; // Invalid format: no '='

        const name = nameValuePart.substring(0, eqPos);
        const value = nameValuePart.substring(eqPos + 1);

        const cookieOptions: { [key: string]: any } = { path: "/" }; // Default path

        optionsParts.forEach((optionPart: string) => {
          const [key, ...valParts] = optionPart.split("=");
          const optionKey = key.trim().toLowerCase();
          const optionValue = valParts.join("=").trim(); // Handle values with '='

          if (optionKey === "path") cookieOptions.path = optionValue;
          else if (optionKey === "expires")
            cookieOptions.expires = new Date(optionValue);
          else if (optionKey === "max-age")
            cookieOptions.maxAge = parseInt(optionValue, 10);
          else if (optionKey === "domain") cookieOptions.domain = optionValue;
          else if (optionKey === "secure") cookieOptions.secure = true;
          else if (optionKey === "httponly") cookieOptions.httpOnly = true;
          else if (optionKey === "samesite")
            cookieOptions.sameSite = optionValue; // 'Lax', 'Strict', 'None'
        });

        // Set the cookie using Next.js cookies API
        const cookieStore = await cookies();
        cookieStore.set(name, value, cookieOptions);
      }
    } else {
      console.warn(
        "Login successful but no 'Set-Cookie' header found in response.",
      );
      // If no cookie header, session won't persist. Return an error.
      return { error: "Login succeeded, but session cookie could not be set." };
    }
    let userData;
    try {
      userData = await response.json(); // Assuming user data is returned as JSON
      // Check if userData contains user information as expected
      if (!userData || !userData.user) {
        // Adjust this check based on actual response structure
        console.error(
          "Login response OK, but user data not found in JSON body.",
        );
        return { error: "Login failed: User data missing in response." };
      }
      // Update last login timestamp after successful sign-in
      await AuthRepository.updateLastLogin(dbUser.id);

      return { success: true, user: userData.user }; // Return the user object from JSON
    } catch (e) {
      console.error("Failed to parse JSON response or get user data:", e);
      return { error: "Login failed: Could not retrieve user information." };
    }
  }

  static async logout() {
    const sessionHeaders = await headers();
    await auth.api.signOut({
      headers: sessionHeaders,
    });
  }
}
