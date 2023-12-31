import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Drawer,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../store";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import Logo from "../../components/Logo";

const Navbar = () => {
  const [mobileMenuToggled, setMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNotMobile = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
         <Logo/>
        </Typography>
        {isNotMobile && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            paddingBottom="0.1rem 1.5rem"
          >
            <InputBase sx={{ padding: "0 1rem" }} placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* DESKTOP nav */}
      {isNotMobile ? (
        <FlexBetween gap="2rem">
          <Tooltip
            title={
              <Typography variant="body2" component="p" p="0.2rem">
                Light Switch
              </Typography>
            }
            sx={{
              "& .MuiTooltip-tooltip": {
                fontSize: "4rem",
              },
            }}
            arrow
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              <Typography variant="body2" component="p" p="0.2rem">
                Messages
              </Typography>
            }
            arrow
          >
            <IconButton>
              <Badge badgeContent={2} color="primary">
                <Message sx={{ color: dark, fontSize: "25px" }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              <Typography variant="body2" component="p" p="0.2rem">
                Notifications
              </Typography>
            }
            arrow
          >
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <Notifications sx={{ color: dark, fontSize: "25px" }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              <Typography variant="body2" component="p" p="0.2rem">
                Help
              </Typography>
            }
            arrow
          >
            <IconButton>
              <Help sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
          </Tooltip>

          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,

                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setMobileMenuToggled(!mobileMenuToggled)}>
          <Menu sx={{ fontSize: "1.5rem" }} />
        </IconButton>
      )}
      {/* MOBILE NAV */}

      <Drawer
        anchor="right"
        open={mobileMenuToggled}
        onClick={() => setMobileMenuToggled(!mobileMenuToggled)}
      >
        <Box
          height="100%"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box>
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setMobileMenuToggled(!mobileMenuToggled)}
              >
                <Close sx={{ fontSize: "1.5rem" }} />
              </IconButton>
            </Box>
          </Box>

          {/* MENU ITEMS */}

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Notifications sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Help sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>

            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      </Drawer>
    </FlexBetween>
  );
};

export default Navbar;
