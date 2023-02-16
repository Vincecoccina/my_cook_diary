import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper position="relative">
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        src="http://localhost:8080/assets/info2.jpeg"
        alt="advert"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>KFC</Typography>
        <Typography color={medium}>KFC.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Delicious Buger
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
