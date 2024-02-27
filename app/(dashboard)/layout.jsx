import Header from "@/components/03-Organisms/Header";
import SideBar from "@/components/03-Organisms/SideBar";
import BackendFooter from "@/components/03-Organisms/BackendFooter";
import Wrapper from "@/components/02-Molecules/Wrapper";
import ProgressBar from "@/components/02-Molecules/ProgressBar";
import Toast from "@/components/02-Molecules/Toast";

export default function DashboardLayout({ children }) {
  return (
    <body>
      <ProgressBar />
      <Toast />
      <Header />
      <SideBar />
      <Wrapper>{children}</Wrapper>
      <BackendFooter />
    </body>
  );
}
