import type { VendorAdapter } from "./vendor.ts";
import { CareValidateAdapter } from "./carevalidate-adapter.ts";

export function getVendorAdapter(): VendorAdapter {
  const vendor = Deno.env.get("ACTIVE_VENDOR") ?? "carevalidate";

  if (vendor === "carevalidate") {
    return new CareValidateAdapter();
  }

  // Future: add new vendor adapters here
  // if (vendor === "newvendor") return new NewVendorAdapter();

  throw new Error(`Unknown vendor: ${vendor}`);
}
