import Image from "next/image";
import logos from "@/public/assets/images/logos/3-logos-transparent-bg.png";
import fb from "@/public/assets/images/logos/social/facebook1.png";
import ig from "@/public/assets/images/logos/social/instagram1.png";
import linkedin from "@/public/assets/images/logos/social/linkedIn1.png";
import twitter from "@/public/assets/images/logos/social/twitter1.png";
import yt from "@/public/assets/images/logos/social/youtube1.png";
import Link from "next/link";

export default function BackendFooter() {
  return (
    <>
      <footer id="footer" className="footer mt-auto font-dm-sans">
        <div className="copyright bg-light py-3">
          <div className="container gap-3">
            <div className="row">
              <div className="col-md-6">
                <div className="">
                  &copy; Copyright &nbsp;
                  <strong>
                    <span>Thinkepic</span>
                  </strong>
                  . All Rights Reserved
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center justify-content-md-end gap-3">
                <Link href={"/term-of-use"} className="color-app-3">
                  Term of Use
                </Link>
                <Link href={"/privacy-policy"} className="color-app-3">
                  Privacy Policy
                </Link>
                <Link href={"/sitemap"} className="color-app-3">
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
