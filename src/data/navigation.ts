import {  NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";



export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Trang chủ",
    type: "none",
    targetBlank:false,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-experiences",
    name: "Địa điểm",
    type: "none",
    targetBlank:false,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Khách sạn",
    type: "none",
    targetBlank:false,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-real-estate",
    name: "Chuyến đi",
    type: "none",
    targetBlank:false,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Liên hệ",
    type: "none",
    targetBlank:false,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "Giới thiệu",
    type: "none",
    targetBlank:false,
    isNew: true,
  },
];
