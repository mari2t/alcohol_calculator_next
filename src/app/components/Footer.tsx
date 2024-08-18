import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-white pt-2 sm:pt-4 lg:pt-8">
      <footer className="mx-auto max-w-screen-2xl px-2 md:px-4">
        <div className="py-2 text-center text-sm text-gray-400">
          本ウェブサイト上の情報は一般的なものであり、個々の健康状態や具体的な医療アドバイスを提供するものではありません。
        </div>
        <div className="py-2 text-center text-sm text-gray-400">
          飲酒に関連するリスクについては、個人の責任のもと、適切な判断を行ってください。
        </div>
        <div className="py-2 text-center text-sm text-gray-400">
          健康を第一に考慮し、節度ある飲酒を心掛けましょう。
        </div>
        <div className="py-2 text-center text-sm text-gray-400">
          © 2024 - Present mari2t All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
