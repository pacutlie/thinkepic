import Image from "next/image";
import logos from "@/public/assets/images/logos/3-logos-transparent-bg.png";
import fb from "@/public/assets/images/logos/social/facebook1.png";
import ig from "@/public/assets/images/logos/social/instagram1.png";
import linkedin from "@/public/assets/images/logos/social/linkedIn1.png";
import twitter from "@/public/assets/images/logos/social/twitter1.png";
import yt from "@/public/assets/images/logos/social/youtube1.png";
import Link from "next/link";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";

const socialMedia = [
  { name: fb, url: "https://www.facebook.com/fhi360" },
  { name: ig, url: "https://www.instagram.com/fhi360" },
  { name: linkedin, url: "https://www.linkedin.com/company/fhi-360" },
  { name: twitter, url: "https://twitter.com/fhi360" },
  { name: yt, url: "https://www.youtube.com/channel/UCQBil0X79qGUpd68rCBUfHw" },
];

export default function Footer() {
  // const session = await getServerSession(authOptions);
  return (
    <>
      <footer id="footer" className="footer mt-auto font-dm-sans bg-app-3 text-white">
        <div className="container col-md-10 gap-3 pt-5 pb-4 py-md-5">
          <div className="row gy-5 px-2">
            <div className="col-md-6">
              EpiC is a global cooperative agreement dedicated to achieving and maintaining HIV epidemic control and supporting global COVID-19 and Monkeypox response. It is led by FHI 360 with core partners Right to Care, Palladium
              International, and Population Services International (PSI).
            </div>
            <div className="col-md-6 d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center justify-content-md-end align-items-md-baseline">
              <div className="text-uppercase fw-bold">Follow Us</div>
              <ul className="d-flex gap-2 p-0" style={{ listStyle: "none" }}>
                {socialMedia.map((e, i) => (
                  <li key={i}>
                    <a href={e.url}>
                      <Image src={e.name} width={40} alt="social" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="copyright text-white">
          <div className="container col-md-10 gap-3">
            <div className="row g-4 g-md-5 px-2">
              <div className="col-md-6">
                <div className="opacity-50 text-center text-md-start">
                  &copy; Copyright &nbsp;
                  <strong>
                    <span>Thinkepic</span>
                  </strong>
                  . All Rights Reserved
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center justify-content-md-end gap-3">
                <Link href={"/term-of-use"} className="text-white">
                  Term of Use
                </Link>
                <Link href={"/privacy-policy"} className="text-white">
                  Privacy Policy
                </Link>
                <Link href={"/sitemap"} className="text-white">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <script src="/assets/vendor/apexcharts/apexcharts.min.js" async></script>
      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" async></script>
      <script src="/assets/vendor/chart.js/chart.umd.js" async></script>
      <script src="/assets/vendor/echarts/echarts.min.js" async></script>
      <script src="/assets/vendor/quill/quill.min.js" async></script>
      <script src="/assets/vendor/simple-datatables/simple-datatables.js" async></script>
      <script src="/assets/vendor/php-email-form/validate.js" async></script>

      <script src="/assets/js/main.js" async></script>
    </>
  );
}
