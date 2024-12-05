import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BackpackIcon from '@mui/icons-material/Backpack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';

interface MenuItem {
    name: string;
    link: string;
    icon: React.ElementType;
}

export const MenuItems: MenuItem[] = [
    {
        name: "Главная",
        link: "/home",
        icon: HomeIcon,
    },
    {
        name: "Задача коммивояжера",
        link: "/home/tsp",
        icon: TravelExploreIcon,
    },
    {
        name: "Задача о рюкзаке",
        link: "/home/kp",
        icon: BackpackIcon,
    },
    {
        name: "Справка",
        link: "/home/info",
        icon: HelpOutlineIcon,
    },
    {
        name: "История",
        link: "/home/history",
        icon: HistoryIcon,
    }
]