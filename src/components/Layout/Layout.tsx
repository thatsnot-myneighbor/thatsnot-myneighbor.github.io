import styles from './styles/Layout.module.scss';

// Components
import Topbar from '@/components/Topbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '../Sidebar/Sidebar';
import Container from '../Container';
import TopGames from "@/components/TopGames";

// import Sidebar from 'components/Sidebar';
// import Footer from 'components/Footer';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({children}) => {

  let classes = [styles.layout];

  return (
    <div className={classes.join(' ')}>
      <div className={styles.layout__top}>
        <Topbar/>

        <Header title={"AppName"}/>

        <Container>
          <TopGames/>
        </Container>

        <Container className="content-container">

          <div className={styles.layout__area}>
            <div className={styles.layout__content}>
              {children}
            </div>

            <div className={styles.layout__side}>
              <Sidebar/>
            </div>
          </div>
        </Container>
      </div>

      <div className={styles.layout__footer}>
        <Footer/>
      </div>

      <div className="svg-loader">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-search" viewBox="0 0 64 64">
            <path
              d="M54.5334 52.6467L44.1161 42.2307C47.3195 38.5987 49.0837 33.9202 49.0761 29.0773C49.0761 23.7347 46.9961 18.712 43.2187 14.9347C39.4414 11.1573 34.4187 9.07733 29.0774 9.07733C23.7361 9.07733 18.712 11.1573 14.9334 14.9333C11.1547 18.7093 9.07605 23.7333 9.07605 29.076C9.07605 34.4187 11.156 39.44 14.9334 43.2173C18.7107 46.9947 23.7334 49.076 29.076 49.076C33.9694 49.076 38.5827 47.312 42.2294 44.1147L52.6454 54.5307C52.7689 54.6549 52.9158 54.7535 53.0776 54.8208C53.2394 54.8881 53.4128 54.9227 53.5881 54.9227C53.7633 54.9227 53.9367 54.8881 54.0985 54.8208C54.2603 54.7535 54.4072 54.6549 54.5307 54.5307C54.7807 54.2806 54.9211 53.9416 54.9211 53.588C54.9211 53.2345 54.7807 52.8954 54.5307 52.6453L54.5334 52.6467ZM16.8187 41.3333C13.5454 38.0587 11.7427 33.7067 11.7427 29.0773C11.7427 24.448 13.5454 20.0947 16.8187 16.82C20.0934 13.5467 24.4454 11.744 29.076 11.744C33.7067 11.744 38.0587 13.5467 41.3334 16.82C44.6067 20.0947 46.4107 24.4467 46.4107 29.0773C46.4107 33.708 44.6067 38.0587 41.3334 41.3333C38.0587 44.6067 33.7067 46.4107 29.0774 46.4107C24.4481 46.4107 20.0921 44.6067 16.8187 41.3333Z"/>
          </symbol>

          <symbol id="icon-news" viewBox="0 0 64 64">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M33.9866 14.16C33.8921 13.9741 33.7553 13.813 33.5872 13.6896C33.4191 13.5662 33.2244 13.484 33.0187 13.4495C32.813 13.415 32.6022 13.4292 32.403 13.491C32.2038 13.5528 32.0219 13.6605 31.8719 13.8053L20.8039 24.5053L28.5026 39.6627L43.7119 37.136C43.9187 37.1018 44.1145 37.0193 44.2834 36.8953C44.4523 36.7712 44.5896 36.6091 44.6841 36.4221C44.7787 36.2351 44.8278 36.0284 44.8276 35.8189C44.8273 35.6093 44.7776 35.4028 44.6826 35.216L33.9866 14.16ZM29.7679 42.1546L44.1493 39.7653C44.769 39.6623 45.3558 39.4148 45.8621 39.0428C46.3684 38.6708 46.7799 38.1848 47.0634 37.6241C47.3468 37.0635 47.4942 36.4439 47.4936 35.8156C47.493 35.1874 47.3445 34.5681 47.0599 34.008L36.3653 12.9533C36.0818 12.3952 35.6712 11.9115 35.1667 11.5409C34.6622 11.1704 34.0778 10.9235 33.4604 10.82C32.8431 10.7165 32.21 10.7593 31.6122 10.9451C31.0145 11.1308 30.4686 11.4542 30.0186 11.8893L18.3866 23.1333L10.4599 27.16C9.51425 27.6404 8.79812 28.4769 8.46906 29.4853C8.14001 30.4937 8.22497 31.5915 8.70528 32.5373L14.9413 44.8173C15.1793 45.2856 15.5072 45.7025 15.9064 46.0441C16.3055 46.3856 16.768 46.6452 17.2674 46.808C17.7669 46.9709 18.2936 47.0337 18.8173 46.993C19.3411 46.9522 19.8517 46.8087 20.3199 46.5707L21.9946 45.72L25.5079 52.6373C25.9884 53.583 26.8248 54.2991 27.8333 54.6282C28.8417 54.9573 29.9395 54.8723 30.8853 54.392L31.3719 54.1453C31.8404 53.9074 32.2574 53.5796 32.5991 53.1805C32.9408 52.7814 33.2005 52.3189 33.3635 51.8195C33.5264 51.32 33.5893 50.7933 33.5487 50.2695C33.5081 49.7457 33.3646 49.235 33.1266 48.7667L29.7679 42.1546ZM27.2359 43.0573L24.3719 44.5133L27.8853 51.4293C28.0454 51.7445 28.324 51.9832 28.6601 52.093C28.9961 52.2028 29.362 52.1746 29.6773 52.0146L30.1639 51.7666C30.4791 51.6066 30.7179 51.3279 30.8276 50.9918C30.9374 50.6558 30.9092 50.2899 30.7493 49.9746L27.2359 43.0573ZM26.0279 40.68L18.5839 26.024L11.6666 29.536C11.5105 29.6154 11.3715 29.7247 11.2577 29.8578C11.1438 29.9909 11.0573 30.1451 11.0031 30.3117C10.9489 30.4782 10.928 30.6538 10.9416 30.8284C10.9553 31.003 11.0032 31.1732 11.0826 31.3293L17.3199 43.6093C17.4803 43.9243 17.7591 44.1627 18.0951 44.2722C18.4311 44.3817 18.7968 44.3533 19.1119 44.1933L26.0279 40.68ZM47.4453 7.54532C47.693 7.79764 47.8303 8.13801 47.827 8.49157C47.8238 8.84513 47.6802 9.18292 47.4279 9.43065L41.6319 15.1226C41.3796 15.3705 41.0392 15.508 40.6855 15.5049C40.3318 15.5018 39.9938 15.3583 39.7459 15.106C39.4981 14.8537 39.3605 14.5132 39.3637 14.1595C39.3668 13.8058 39.5103 13.4679 39.7626 13.22L45.5599 7.52665C45.8124 7.27915 46.1529 7.14207 46.5065 7.14557C46.86 7.14907 47.1977 7.29286 47.4453 7.54532ZM54.2666 15.28C54.4377 15.5894 54.479 15.9541 54.3812 16.2939C54.2834 16.6338 54.0547 16.9208 53.7453 17.092L44.9973 21.936C44.8441 22.0209 44.6756 22.0748 44.5016 22.0946C44.3275 22.1145 44.1513 22.0998 43.9829 22.0515C43.8145 22.0033 43.6573 21.9223 43.5202 21.8132C43.3831 21.7042 43.2689 21.5692 43.1839 21.416C43.099 21.2628 43.0451 21.0943 43.0253 20.9203C43.0055 20.7462 43.0201 20.57 43.0684 20.4016C43.1167 20.2332 43.1977 20.076 43.3067 19.9389C43.4158 19.8018 43.5507 19.6876 43.7039 19.6026L52.4533 14.7586C52.6065 14.6737 52.7749 14.6197 52.949 14.5998C53.123 14.5799 53.2993 14.5946 53.4677 14.6429C53.6361 14.6912 53.7933 14.7722 53.9304 14.8813C54.0675 14.9903 54.1817 15.1254 54.2666 15.2786V15.28ZM58.2093 25.048C58.2874 25.3926 58.2255 25.7541 58.0372 26.0531C57.849 26.3521 57.5498 26.5641 57.2053 26.6427L48.2999 28.6693C47.955 28.7476 47.593 28.6857 47.2937 28.4972C46.9944 28.3087 46.7823 28.0089 46.7039 27.664C46.6256 27.319 46.6875 26.9571 46.8761 26.6578C47.0646 26.3585 47.3643 26.1463 47.7093 26.068L56.6146 24.0426C56.9594 23.9646 57.321 24.0267 57.6201 24.2152C57.9191 24.4037 58.131 24.7032 58.2093 25.048Z"/>
          </symbol>

          <symbol id="icon-best" viewBox="0 0 64 64">
            <path
              d="M56.375 26.125C56.375 23.6438 54.3562 21.625 51.875 21.625H36.5227L38.7834 14.2793C39.3138 12.5552 39.0039 10.7344 37.9318 9.28319C36.8596 7.83194 35.2109 7 33.407 7H33.1702C32.4886 7.00298 31.8237 7.21089 31.2619 7.59669C30.7 7.9825 30.2672 8.52837 30.0196 9.16337L27.1374 16.6593C25.9282 19.7962 23.9969 22.6042 21.5 24.8554V23.875C21.5 22.0137 19.9863 20.5 18.125 20.5H11.375C9.51369 20.5 8 22.0137 8 23.875V48.625C8 50.4863 9.51369 52 11.375 52H18.125C19.9863 52 21.5 50.4863 21.5 48.625V47.1884L23.5419 48.355C26.432 50.0051 29.7021 50.8736 33.0301 50.875H45.125C47.6062 50.875 49.625 48.8562 49.625 46.375C49.6259 45.4817 49.3595 44.6086 48.86 43.8679C50.6127 43.2526 51.875 41.5853 51.875 39.625C51.8759 38.7317 51.6095 37.8586 51.11 37.1179C52.8627 36.5026 54.125 34.8353 54.125 32.875C54.1259 31.9817 53.8595 31.1086 53.36 30.3679C55.1127 29.7526 56.375 28.0853 56.375 26.125ZM19.25 48.625C19.25 49.2454 18.7454 49.75 18.125 49.75H11.375C10.7546 49.75 10.25 49.2454 10.25 48.625V23.875C10.25 23.2546 10.7546 22.75 11.375 22.75H18.125C18.7454 22.75 19.25 23.2546 19.25 23.875V48.625ZM51.875 28.375H44C43.7016 28.375 43.4155 28.4935 43.2045 28.7045C42.9935 28.9155 42.875 29.2016 42.875 29.5C42.875 29.7984 42.9935 30.0845 43.2045 30.2955C43.4155 30.5065 43.7016 30.625 44 30.625H49.625C50.8659 30.625 51.875 31.6341 51.875 32.875C51.875 34.1159 50.8659 35.125 49.625 35.125H42.875C42.5766 35.125 42.2905 35.2435 42.0795 35.4545C41.8685 35.6655 41.75 35.9516 41.75 36.25C41.75 36.5484 41.8685 36.8345 42.0795 37.0455C42.2905 37.2565 42.5766 37.375 42.875 37.375H47.375C48.6159 37.375 49.625 38.3841 49.625 39.625C49.625 40.8659 48.6159 41.875 47.375 41.875H41.75C41.4516 41.875 41.1655 41.9935 40.9545 42.2045C40.7435 42.4155 40.625 42.7016 40.625 43C40.625 43.2984 40.7435 43.5845 40.9545 43.7955C41.1655 44.0065 41.4516 44.125 41.75 44.125H45.125C46.3659 44.125 47.375 45.1341 47.375 46.375C47.375 47.6159 46.3659 48.625 45.125 48.625H33.0301C30.0937 48.6239 27.2081 47.8577 24.6579 46.402L21.5 44.5975V27.7906L21.9449 27.4345C25.2159 24.8167 27.7327 21.3769 29.2378 17.467L32.12 9.97112C32.2026 9.75953 32.3469 9.57764 32.5342 9.44906C32.7215 9.32047 32.943 9.25112 33.1702 9.25H33.407C34.4892 9.25 35.4792 9.7495 36.1222 10.6202C36.7651 11.491 36.9513 12.5834 36.6329 13.6178L34.3717 20.9641C34.2667 21.3004 34.2429 21.6569 34.3021 22.0043C34.3614 22.3517 34.502 22.6801 34.7126 22.9626C34.9211 23.2467 35.1938 23.4774 35.5085 23.636C35.8232 23.7945 36.1709 23.8764 36.5233 23.875H51.875C53.1159 23.875 54.125 24.8841 54.125 26.125C54.125 27.3659 53.1159 28.375 51.875 28.375Z"/>
          </symbol>

          <symbol id="icon-angle-down" viewBox="0 0 64 64">
            <path
              d="M31.9999 52C31.7372 52.0003 31.4771 51.9486 31.2344 51.8481C30.9918 51.7475 30.7714 51.6 30.5859 51.414L10.5859 31.414C9.80438 30.6325 9.80438 29.367 10.5859 28.586C11.3674 27.805 12.6329 27.8045 13.4139 28.586L31.9999 47.172L50.5859 28.586C51.3674 27.8045 52.6329 27.8045 53.4139 28.586C54.1949 29.3675 54.1954 30.633 53.4139 31.414L33.4139 51.414C33.2284 51.6 33.008 51.7475 32.7653 51.8481C32.5227 51.9486 32.2626 52.0003 31.9999 52ZM33.4139 35.414L53.4139 15.414C54.1954 14.6325 54.1954 13.367 53.4139 12.586C52.6324 11.805 51.3669 11.8045 50.5859 12.586L31.9999 31.172L13.4139 12.586C12.6324 11.8045 11.3669 11.8045 10.5859 12.586C9.80488 13.3675 9.80438 14.633 10.5859 15.414L30.5859 35.414C30.9764 35.8045 31.4884 36 31.9999 36C32.5114 36 33.0234 35.8045 33.4139 35.414Z"/>
          </symbol>

          <symbol id="icon-play" viewBox="0 0 64 64">
            <path
              d="M48.7441 26.692L21.5753 9.94464C19.6097 8.73454 17.2332 8.68422 15.2181 9.81006C13.203 10.9357 12 12.986 12 15.2942V48.6364C12 52.1264 14.8121 54.981 18.2684 54.9999L18.2965 55C19.3766 54.9999 20.5022 54.6614 21.5535 54.0199C22.3992 53.5039 22.6664 52.4001 22.1505 51.5545C21.6345 50.7087 20.5305 50.4415 19.6851 50.9575C19.1934 51.2574 18.7131 51.4125 18.2877 51.4124C16.9836 51.4053 15.5874 50.2882 15.5874 48.6364V15.2943C15.5874 14.3041 16.1034 13.4248 16.9677 12.9419C17.8321 12.459 18.8514 12.4806 19.6935 12.9991L46.8624 29.7464C47.679 30.2492 48.1463 31.0875 48.1443 32.0465C48.1423 33.0054 47.6716 33.8419 46.8505 34.3429L27.2073 46.3701C26.3624 46.8875 26.0969 47.9917 26.6142 48.8365C27.1314 49.6814 28.2357 49.947 29.0806 49.4297L48.7214 37.4039C50.602 36.2567 51.7273 34.2568 51.7318 32.0537C51.7363 29.8509 50.619 27.8463 48.7441 26.692Z"/>
          </symbol>

          <symbol id="icon-fullscreen" viewBox="0 0 64 64">
            <path
              d="M55.0001 10.4375C55.0001 9.63533 54.3648 9 53.5627 9H40.6466C39.8301 9 39.222 9.64405 39.2206 10.4605C39.2206 11.2756 39.8301 11.8751 40.6466 11.8751H52.1251L52.102 23.4081C52.102 24.2246 52.723 24.8456 53.5395 24.8456C54.3559 24.8442 54.9769 24.2246 54.9769 23.4081L55 10.4591C55 10.4548 54.9986 10.4519 54.9986 10.4491C54.9987 10.4446 55.0001 10.4418 55.0001 10.4375ZM23.3981 9H10.482C10.4777 9 10.4749 9.00143 10.4706 9.00143C10.4677 9.00143 10.4634 9 10.4605 9C9.65839 9 9.02294 9.63533 9.02294 10.4375L9 23.3865C9 24.203 9.64405 24.8125 10.4605 24.8125C11.2756 24.8125 11.8751 24.203 11.8751 23.3865L11.898 11.8749H23.398C24.2144 11.8749 24.8354 11.2539 24.8354 10.4375C24.8341 9.62099 24.2131 9 23.3981 9ZM23.3535 52.1251H11.8751V40.6251C11.8751 39.8086 11.2541 39.1876 10.4376 39.1876C9.62111 39.1876 9 39.8085 9 40.6251V53.541C9 53.5453 9.00143 53.5482 9.00143 53.5511C9.00143 53.5554 9 53.5582 9 53.5625C9 54.3647 9.63533 55 10.4375 55H23.3534C24.1699 55 24.778 54.3559 24.7794 53.5395C24.7795 52.7245 24.17 52.1251 23.3535 52.1251ZM53.5396 39.2206C52.7231 39.2206 52.1236 39.8301 52.1251 40.6466V52.1251H40.6251C39.8086 52.1251 39.1876 52.7461 39.1876 53.5625C39.1876 54.379 39.8086 55 40.6251 55H53.541C53.5453 55 53.5482 54.9986 53.5511 54.9986C53.5554 54.9971 53.5582 55 53.5625 55C54.3647 55 55 54.3647 55 53.5625V40.6466C55.0001 39.8301 54.3561 39.2206 53.5396 39.2206Z"/>
          </symbol>

          <symbol id="icon-menu" viewBox="0 0 64 64">
            <path
              d="M50 14C51.2 14 52 13.2 52 12C52 10.8 51.2 10 50 10H14C12.8 10 12 10.8 12 12C12 13.2 12.8 14 14 14H50ZM50 54C51.2 54 52 53.2 52 52C52 50.8 51.2 50 50 50H14C12.8 50 12 50.8 12 52C12 53.2 12.8 54 14 54H50ZM55 30H9C7.8 30 7 30.8 7 32C7 33.2 7.8 34 9 34H55C56.2 34 57 33.2 57 32C57 30.8 56.2 30 55 30Z"/>
          </symbol>

          <symbol id="icon-close" viewBox="0 0 64 64">
            <path
              d="M8.49848 55.4972C8.65768 55.6566 8.84674 55.7831 9.05484 55.8693C9.26294 55.9556 9.486 56 9.71128 56C9.93655 56 10.1596 55.9556 10.3677 55.8693C10.5758 55.7831 10.7649 55.6566 10.9241 55.4972L31.9916 34.4297L53.0678 55.4972C53.3894 55.8189 53.8257 55.9996 54.2806 55.9996C54.7355 55.9996 55.1717 55.8189 55.4934 55.4972C55.815 55.1756 55.9957 54.7393 55.9957 54.2844C55.9957 53.8296 55.815 53.3933 55.4934 53.0716L34.4172 32.0041L55.4848 10.928C55.8064 10.6063 55.9872 10.17 55.9872 9.71516C55.9872 9.26027 55.8064 8.82401 55.4848 8.50236C55.1631 8.1807 54.7269 8 54.272 8C53.8171 8 53.3809 8.1807 53.0592 8.50236L31.9916 29.5785L10.9155 8.51093C10.5876 8.2301 10.1658 8.08335 9.73433 8.10001C9.3029 8.11668 8.89366 8.29553 8.58836 8.60082C8.28307 8.90611 8.10423 9.31535 8.08756 9.74678C8.0709 10.1782 8.21765 10.6 8.49848 10.928L29.566 32.0041L8.49848 53.0802C8.17921 53.4014 8 53.8359 8 54.2887C8 54.7416 8.17921 55.1761 8.49848 55.4972Z"/>
          </symbol>

          <symbol id="icon-github" viewBox="0 0 64 64">
            <path
              d="M31.996 0.666138C14.328 0.666138 0 15.0501 0 32.7941C0 46.9861 9.168 59.0261 21.888 63.2781C23.488 63.5741 24.072 62.5821 24.072 61.7301C24.072 60.9661 24.044 58.9461 24.028 56.2661C15.128 58.2061 13.248 51.9581 13.248 51.9581C11.796 48.2461 9.696 47.2581 9.696 47.2581C6.788 45.2661 9.912 45.3061 9.912 45.3061C13.124 45.5341 14.812 48.6181 14.812 48.6181C17.668 53.5261 22.304 52.1101 24.128 51.2861C24.416 49.2101 25.244 47.7941 26.16 46.9901C19.056 46.1781 11.584 43.4221 11.584 31.1141C11.584 27.6061 12.832 24.7381 14.88 22.4901C14.548 21.6781 13.452 18.4101 15.192 13.9901C15.192 13.9901 17.88 13.1261 23.992 17.2821C26.544 16.5701 29.28 16.2141 32.004 16.2021C34.72 16.2181 37.46 16.5701 40.016 17.2861C46.124 13.1301 48.808 13.9941 48.808 13.9941C50.552 18.4181 49.456 21.6821 49.128 22.4941C51.18 24.7421 52.416 27.6101 52.416 31.1181C52.416 43.4581 44.936 46.1741 37.808 46.9701C38.956 47.9621 39.98 49.9221 39.98 52.9181C39.98 57.2141 39.94 60.6781 39.94 61.7301C39.94 62.5901 40.516 63.5901 42.14 63.2741C54.84 59.0181 64 46.9821 64 32.7941C64 15.0501 49.672 0.666138 31.996 0.666138Z"
              fill="#5C6BC0"/>
          </symbol>

          <symbol id="icon-youtube" viewBox="0 0 64 64">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M60.2565 12.5069C58.9639 11.3335 57.3269 10.564 55.5365 10.3661C51.6452 9.93061 47.7185 9.71137 43.7789 9.60146C39.8645 9.49227 35.9334 9.49227 32.0109 9.49456C28.0891 9.49227 24.1582 9.49227 20.2433 9.60146C16.3032 9.71137 12.3754 9.93061 8.48182 10.3661C6.69318 10.5641 5.05689 11.334 3.76548 12.5078C2.4823 13.6741 1.53953 15.2405 1.1271 17.0411C0.57034 19.4548 0.288681 21.973 0.146383 24.5069C0.00353201 27.0515 0 29.5639 0 32.0029C0 34.4386 6.39164e-07 36.9478 0.13949 39.4939C0.278298 42.0266 0.556553 44.5448 1.11362 46.9588C1.52851 48.7601 2.47174 50.327 3.75485 51.4933C5.04548 52.6665 6.68012 53.4359 8.46829 53.6338C12.3623 54.0693 16.2901 54.2885 20.2303 54.3984C24.1451 54.5076 28.076 54.5076 31.9984 54.5053C35.9226 54.5076 39.8534 54.5076 43.7677 54.3984C47.7073 54.2885 51.6339 54.0693 55.5275 53.6338C57.3153 53.4359 58.9497 52.6667 60.2409 51.4938C61.5246 50.3277 62.4691 48.7607 62.8867 46.9588C63.4413 44.5447 63.7196 42.0265 63.8589 39.4939C63.9964 36.9963 63.9975 34.4627 63.9974 32.0028H64V31.8794H63.9974C63.9974 26.9922 63.9974 21.8159 62.9002 17.0412C62.4853 15.2398 61.5411 13.6731 60.2565 12.5069Z"
                  fill="#E42B26"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M44.1432 30.7982C40.5151 28.9037 36.8867 27.0098 33.258 25.1166C30.2511 23.5475 27.2469 21.9798 24.2339 20.4068L23.2393 19.8875V42.838L24.2313 42.3241C27.559 40.6004 30.8725 38.883 34.1859 37.1652L44.1405 32.0029L45.2993 31.4019L44.1432 30.7982Z"
                  fill="#FFFFFE"/>
          </symbol>

          <symbol id="smile" viewBox="0 0 512 512">
            <path
              d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z"
              fill="#FFDD67"/>
            <path
              d="M256 409.805C225.205 409.809 195.175 400.209 170.092 382.343C145.01 364.476 126.123 339.232 116.063 310.126C115.21 307.927 114.81 305.579 114.885 303.222C114.96 300.865 115.509 298.547 116.5 296.407C117.491 294.266 118.903 292.348 120.651 290.765C122.4 289.183 124.449 287.969 126.678 287.196C128.906 286.423 131.267 286.107 133.62 286.267C135.973 286.427 138.269 287.059 140.373 288.126C142.476 289.193 144.342 290.673 145.861 292.477C147.38 294.282 148.519 296.374 149.211 298.628C156.848 320.879 171.245 340.189 190.391 353.86C209.537 367.531 232.474 374.88 256 374.88C279.525 374.88 302.463 367.531 321.609 353.86C340.754 340.189 355.151 320.879 362.788 298.628C363.481 296.374 364.62 294.282 366.139 292.477C367.657 290.673 369.524 289.193 371.627 288.126C373.73 287.059 376.027 286.427 378.38 286.267C380.733 286.107 383.094 286.423 385.322 287.196C387.55 287.969 389.6 289.183 391.349 290.765C393.097 292.348 394.509 294.266 395.5 296.407C396.49 298.547 397.04 300.865 397.115 303.222C397.19 305.579 396.789 307.927 395.937 310.126C385.877 339.232 366.99 364.476 341.908 382.343C316.825 400.209 286.795 409.809 256 409.805Z"
              fill="#6D4C41"/>
            <path
              d="M340.845 227.241C359.427 227.241 374.491 212.177 374.491 193.595C374.491 175.013 359.427 159.949 340.845 159.949C322.263 159.949 307.2 175.013 307.2 193.595C307.2 212.177 322.263 227.241 340.845 227.241Z"
              fill="#6D4C41"/>
            <path
              d="M171.154 227.241C189.736 227.241 204.8 212.177 204.8 193.595C204.8 175.013 189.736 159.949 171.154 159.949C152.572 159.949 137.508 175.013 137.508 193.595C137.508 212.177 152.572 227.241 171.154 227.241Z"
              fill="#6D4C41"/>
          </symbol>

          <symbol id="sad-smile" viewBox="0 0 512 512">
            <path
              d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z"
              fill="#FFDD67"/>
            <path
              d="M357.824 394.176C353.579 394.176 349.507 392.496 346.496 389.504C298.112 341.12 213.824 341.12 165.472 389.504C159.232 395.744 149.088 395.744 142.848 389.504C136.608 383.264 136.608 373.12 142.848 366.88C173.088 336.672 213.248 320 256 320C298.752 320 338.912 336.672 369.12 366.88C375.36 373.12 375.36 383.264 369.12 389.504C366.016 392.64 361.92 394.176 357.824 394.176Z"
              fill="#6D4C41"/>
            <path
              d="M160 224C177.673 224 192 209.673 192 192C192 174.327 177.673 160 160 160C142.327 160 128 174.327 128 192C128 209.673 142.327 224 160 224Z"
              fill="#6D4C41"/>
            <path
              d="M352 224C369.673 224 384 209.673 384 192C384 174.327 369.673 160 352 160C334.327 160 320 174.327 320 192C320 209.673 334.327 224 352 224Z"
              fill="#6D4C41"/>
          </symbol>

          <symbol id="angle-left" viewBox="0 0 32 32">
            <path
              d="M12.9209 15.6654L22.1777 3.92915L19.8222 2.07129L9.07898 15.6922L19.8353 28.9455L22.1647 27.055L12.9209 15.6654Z"/>
          </symbol>

          <symbol id="angle-right" viewBox="0 0 32 32">
            <path
              d="M22.921 15.308L12.1778 28.9289L9.82229 27.071L19.0791 15.3348L9.83535 3.94519L12.1647 2.05469L22.921 15.308Z"/>
          </symbol>

          <svg id="likes-up" viewBox="0 0 64 64">
            <path
              d="M34.3469 64.904C51.9728 63.6127 65.2146 48.2773 63.9233 30.6515C62.6321 13.0256 47.2967 -0.216237 29.6708 1.07503C12.0449 2.3663 -1.19687 17.7017 0.0943999 35.3276C1.38567 52.9534 16.721 66.1952 34.3469 64.904Z"
              fill="#FFD93B"></path>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M48.2139 44.5748C46.4728 47.2955 44.0751 49.5343 41.2416 51.0851C38.4081 52.6358 35.2299 53.4486 31.9998 53.4486C28.7698 53.4486 25.5916 52.6358 22.7581 51.0851C19.9246 49.5343 17.5269 47.2955 15.7858 44.5748C15.5124 44.1286 15.4248 43.5929 15.5419 43.0828C15.6589 42.5727 15.9713 42.1288 16.4119 41.8463C16.8526 41.5639 17.3863 41.4654 17.8987 41.5721C18.4111 41.6787 18.8613 41.9819 19.1527 42.4167C20.5327 44.5718 22.4327 46.345 24.6777 47.5732C26.9228 48.8015 29.4407 49.4452 31.9998 49.4452C34.5588 49.4452 37.0768 48.8015 39.3218 47.5732C41.5668 46.345 43.4668 44.5718 44.8469 42.4167C45.1379 41.9812 45.5882 41.6772 46.101 41.5701C46.6138 41.463 47.1481 41.5614 47.5891 41.8441C48.0301 42.1267 48.3426 42.5711 48.4595 43.0818C48.5763 43.5924 48.4881 44.1285 48.2139 44.5748ZM16.1198 23.9961C16.1198 22.7529 16.6136 21.5606 17.4927 20.6815C18.3718 19.8025 19.5641 19.3086 20.8073 19.3086H20.808C21.7351 19.3086 22.6414 19.5835 23.4123 20.0986C24.1831 20.6136 24.7839 21.3457 25.1387 22.2023C25.4935 23.0588 25.5863 24.0013 25.4055 24.9106C25.2246 25.8199 24.7781 26.6551 24.1226 27.3107C23.467 27.9662 22.6318 28.4127 21.7225 28.5935C20.8132 28.7744 19.8707 28.6816 19.0142 28.3268C18.1577 27.972 17.4256 27.3712 16.9105 26.6003C16.3954 25.8295 16.1205 24.9232 16.1205 23.9961H16.1198ZM38.5048 23.9961C38.5048 22.7529 38.9986 21.5606 39.8777 20.6815C40.7568 19.8025 41.9491 19.3086 43.1923 19.3086H43.1932C44.1203 19.3086 45.0265 19.5835 45.7974 20.0986C46.5682 20.6136 47.1691 21.3457 47.5238 22.2023C47.8786 23.0588 47.9715 24.0013 47.7906 24.9106C47.6097 25.8199 47.1633 26.6551 46.5077 27.3107C45.8522 27.9662 45.0169 28.4127 44.1076 28.5935C43.1984 28.7744 42.2559 28.6816 41.3993 28.3268C40.5428 27.972 39.8107 27.3712 39.2956 26.6003C38.7806 25.8295 38.5057 24.9232 38.5057 23.9961H38.5048Z"
                  fill="black"></path>
          </svg>

          <symbol id="likes-down" viewBox="0 0 64 64">
            <path
              d="M31.9998 63.9997C49.673 63.9997 64 49.673 64 32.0001C64 14.3272 49.673 0.000488281 31.9998 0.000488281C14.3265 0.000488281 -0.000488281 14.3272 -0.000488281 32.0001C-0.000488281 49.673 14.3265 63.9997 31.9998 63.9997Z"
              fill="#FFD93B"></path>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M49.6469 20.1836C49.1394 21.7113 48.1637 23.0404 46.8583 23.9824C45.5528 24.9244 43.9838 25.4313 42.374 25.4313C40.7642 25.4313 39.1952 24.9244 37.8898 23.9824C36.5843 23.0404 35.6086 21.7113 35.1011 20.1836C35.0176 19.934 34.9841 19.6704 35.0026 19.4079C35.0211 19.1454 35.0913 18.8891 35.2091 18.6538C35.3269 18.4185 35.49 18.2087 35.689 18.0366C35.888 17.8644 36.1191 17.7332 36.369 17.6506C36.6188 17.5679 36.8825 17.5354 37.1449 17.5549C37.4074 17.5744 37.6634 17.6455 37.8983 17.7641C38.1332 17.8828 38.3424 18.0466 38.5138 18.2463C38.6852 18.446 38.8155 18.6775 38.8973 18.9277C39.1405 19.6574 39.6072 20.2921 40.2312 20.7419C40.8552 21.1916 41.6049 21.4336 42.3741 21.4336C43.1433 21.4336 43.893 21.1916 44.517 20.7419C45.141 20.2921 45.6077 19.6574 45.8509 18.9277C45.9334 18.6784 46.0641 18.4479 46.2357 18.2491C46.4072 18.0504 46.6163 17.8874 46.8508 17.7695C47.0854 17.6516 47.3409 17.581 47.6027 17.5618C47.8645 17.5426 48.1276 17.5752 48.3768 17.6576C48.6261 17.7401 48.8566 17.8708 49.0554 18.0424C49.2541 18.214 49.4171 18.423 49.535 18.6575C49.6529 18.8921 49.7235 19.1476 49.7427 19.4094C49.7619 19.6713 49.7294 19.9343 49.6469 20.1836ZM21.6246 25.4313C20.0145 25.4332 18.4448 24.927 17.1391 23.9847C15.8334 23.0425 14.8583 21.7123 14.3526 20.1836C14.1861 19.6802 14.2264 19.1313 14.4645 18.6575C14.7027 18.1838 15.1193 17.8242 15.6227 17.6576C16.1261 17.4911 16.675 17.5313 17.1487 17.7695C17.6224 18.0077 17.9821 18.4243 18.1486 18.9277C18.3918 19.6574 18.8583 20.292 19.4822 20.7418C20.1062 21.1916 20.8558 21.4336 21.6249 21.4336C22.394 21.4336 23.1436 21.1916 23.7675 20.7418C24.3915 20.292 24.858 19.6574 25.1011 18.9277C25.1806 18.6747 25.3096 18.44 25.4806 18.2373C25.6516 18.0346 25.8612 17.8679 26.0972 17.747C26.3332 17.626 26.5909 17.5532 26.8553 17.5328C27.1197 17.5124 27.3855 17.5447 27.6373 17.628C27.8891 17.7113 28.1218 17.8438 28.3219 18.0178C28.522 18.1919 28.6854 18.404 28.8028 18.6418C28.9201 18.8796 28.989 19.1384 29.0054 19.4031C29.0219 19.6678 28.9855 19.9331 28.8984 20.1836C28.3924 21.7124 27.417 23.0426 26.111 23.9849C24.805 24.9271 23.235 25.4333 21.6246 25.4313ZM47.3433 44.6536C47.4467 44.8978 47.5006 45.1601 47.5017 45.4253C47.5028 45.6905 47.4512 45.9533 47.3498 46.1984C47.2484 46.4435 47.0992 46.6659 46.911 46.8528C46.7229 47.0397 46.4994 47.1873 46.2536 47.287C46.0079 47.3867 45.7447 47.4366 45.4795 47.4336C45.2143 47.4307 44.9523 47.375 44.7088 47.2699C44.4654 47.1647 44.2452 47.0122 44.0612 46.8212C43.8772 46.6302 43.7331 46.4044 43.6371 46.1572C42.6958 43.8428 41.0857 41.8617 39.0128 40.467C36.9398 39.0723 34.4981 38.3274 31.9996 38.3274C29.5012 38.3274 27.0595 39.0723 24.9865 40.467C22.9135 41.8617 21.3035 43.8428 20.3621 46.1572C20.2668 46.4053 20.123 46.6319 19.9391 46.8238C19.7552 47.0157 19.5349 47.1691 19.2911 47.2748C19.0472 47.3806 18.7848 47.4367 18.519 47.4399C18.2532 47.4431 17.9895 47.3932 17.7432 47.2933C17.4969 47.1934 17.273 47.0454 17.0846 46.8579C16.8961 46.6704 16.747 46.4473 16.6458 46.2015C16.5446 45.9557 16.4934 45.6923 16.4952 45.4265C16.497 45.1607 16.5517 44.8979 16.6563 44.6536C17.8958 41.6005 20.018 38.9866 22.7513 37.1463C25.4847 35.306 28.7049 34.323 32 34.323C35.2951 34.323 38.5153 35.306 41.2487 37.1463C43.982 38.9866 46.1042 41.6005 47.3438 44.6536H47.3433Z"
                  fill="black"></path>
          </symbol>


          <symbol viewBox="0 0 40 60">
            <clipPath id="arrow-left-bg">
              <path
                d="M0 15C0 6.71573 6.71573 0 15 0H40C33.5858 20.892 33.17 34.3772 40 60H15C6.71573 60 0 53.2843 0 45V15Z"/>
            </clipPath>
          </symbol>

          <symbol viewBox="0 0 40 60">
            <clipPath id="arrow-right-bg">
              <path
                d="M40 45C40 53.2843 33.2843 60 25 60L0 60C6.41419 39.108 6.83005 25.6228 5.24537e-06 0L25 2.18557e-06C33.2843 2.9098e-06 40 6.71573 40 15L40 45Z"/>
            </clipPath>
          </symbol>


        </svg>
      </div>
    </div>
  );
};

export default Layout;
