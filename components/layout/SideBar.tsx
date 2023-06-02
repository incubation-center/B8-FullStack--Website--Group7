import { homePageTabAtom } from '@/service/recoil';
import { useRecoilState } from 'recoil';

export default function SideBar() {
  const [currentTab, setCurrentTab] = useRecoilState(homePageTabAtom);

  return <div className='w-[200px] h-full px-[16px]'></div>;
}
