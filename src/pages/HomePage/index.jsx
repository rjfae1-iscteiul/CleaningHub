import React from "react";
import BannerHome from "../../components/Banner";
import BannerSafety from "../../components/SafetyBanner";
import BannerOptions from "../../components/OptionBanner";
import FooterBanner from "../../components/Footer";


export default function Home() {
  return (
    <div>
      <BannerHome />
      <BannerSafety />
      <BannerOptions />
      <FooterBanner />
    </div>
  );
}
