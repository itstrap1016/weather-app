import Navigation from "../components/Navigation";
import CityList from "../components/CityList";
import UnitSetting from "../components/UnitSetting";

function Setting() {
  return (
    <>
      <Navigation backBtn={true} />
      <UnitSetting />
      <CityList />
    </>
  );
}

export default Setting;
