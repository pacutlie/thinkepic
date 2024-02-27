import Footer from "@/components/03-Organisms/Footer";
import TabHeader from "@/components/03-Organisms/TabHeader";
import Wrapper from "@/components/02-Molecules/Wrapper";
import Header from "@/components/03-Organisms/Header";
import Toast from "@/components/02-Molecules/Toast";
import LogoHeader from "@/components/02-Molecules/LogoHeader";

export default function FrontPageLayout({ children }) {
  return (
    <body className="toggle-sidebar">
      <Toast />
      <Header />
      <Wrapper addClass={"p-0"}>
        <LogoHeader />
        <TabHeader />
        {children}
      </Wrapper>
      <Footer />
    </body>
  );
}
