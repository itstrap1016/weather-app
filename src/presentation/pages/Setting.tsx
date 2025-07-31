import Navigation from "../components/Navigation";
import CityList from "../components/CityList";
import UnitSetting from "../components/UnitSetting";
import Reset from "../components/Reset";

function Setting() {
  return (
    <>
      <Navigation backBtn={true} />
      <UnitSetting />
      <CityList />
      <Reset />
    </>
  );
}

export default Setting;
