import { useI18n } from "@/lib/i18n";
import mpgLogo from "@/assets/MPG_logo_classic_v5.png";
import iticbcnLogo from "@/assets/logo-iticbcn.png";

function Footer() {
    const { t } = useI18n();
    return (
        <>
            <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground flex justify-center">
          {t.footer.rights}, {t.footer.madeby} <img src={mpgLogo} alt="MPG" width={60} className="ml-4 mr-4"></img> | <img src={iticbcnLogo} alt="iticbcn" width={70} className="ml-4 mr-4"></img>
        </div>
        {/* <div className="text-center flex justify-center align-center px-2 py-2"><a className="text-sm text-gray-400 hover:text-black transition" href="https://github.com/guerau84/mb92-plastic-marketplace"><Github size={24}/></a></div> */}
        <a title="Google Analytics Alternative" href="https://clicky.com/101503174"><img alt="Clicky" src="//static.getclicky.com/media/links/badge.gif"/></a>
      </footer>
        </>
    )
}
export default Footer;