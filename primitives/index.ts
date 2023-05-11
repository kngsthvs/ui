import ReactWrapBalancer, { Provider } from "react-wrap-balancer";
export { Toaster, toast } from "sonner";
export * from "./Button";
export * from "./Link";

export const Balancer: typeof ReactWrapBalancer & {
  Provider: typeof Provider;
} = Object.assign(ReactWrapBalancer, { Provider });
