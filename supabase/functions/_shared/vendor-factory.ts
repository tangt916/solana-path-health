import type { VendorAdapter } from "./vendor.ts";
import { CareValidateAdapter } from "./carevalidate-adapter.ts";
import { MockAdapter } from "./mock-adapter.ts";

export function getVendorAdapter(): VendorAdapter {
  // Default to mock unless CareValidate is fully configured.
  const explicit = Deno.env.get("ACTIVE_VENDOR");
  const hasCareValidateKey = !!Deno.env.get("CAREVALIDATE_API_KEY");
  const vendor = explicit ?? (hasCareValidateKey ? "carevalidate" : "mock");

  if (vendor === "carevalidate") return new CareValidateAdapter();
  if (vendor === "mock") return new MockAdapter();

  throw new Error(`Unknown vendor: ${vendor}`);
}
