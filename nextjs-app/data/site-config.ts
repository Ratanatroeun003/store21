import { FaFacebook, FaTelegram, FaPhoneAlt,FaShoppingCart,FaExchangeAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import {
    LayoutDashboard,
    ShoppingCart,
} from "lucide-react";
export const SITE_CONFIG = {
  name: 'STORE21',
  description: 'The best online store in Cambodia',
  
  contact:[
    {label:'+855 714407205',icon:FaPhoneAlt},
    {label:'ran@gmail.com',icon:FaEnvelope},
    {label:'Phnom Penh',icon:FaMapMarkerAlt},
  ],
  pageLinks: [
    { label: 'Shop', href: '/' ,icon:FaShoppingCart},
    { label: 'How-to-buy', href: '/how-to-buy',icon:FaExchangeAlt },
    { label: ' Contact', href: '/contact',icon:FaPhoneAlt },
  ],
  socials: [
    { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebook },
    { name: 'Telegram', href: 'https://t.me', icon: FaTelegram },
  ],
adminLink :[
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Item", href: "/admin/items", icon: ShoppingCart },
    
]
};