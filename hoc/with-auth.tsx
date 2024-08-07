import { usePathname, useRouter } from "@/configs/i18n-navigation";
import { useSession } from "next-auth/react";
import { useEffect, ComponentType, FC } from "react";

interface WithAuthProps {}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P & WithAuthProps> => {
  const ComponentWithAuth: FC<P & WithAuthProps> = (props) => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
      if (status !== "loading" && !session && pathname !== "/dang-nhap") {
        router.push(`/dang-nhap?next=${encodeURIComponent(pathname)}` as any);
      }
    }, [session, status, router]);

    // Optionally, render a loading spinner while checking auth status
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return session ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default withAuth;
