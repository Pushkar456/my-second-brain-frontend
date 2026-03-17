import { Dispatch, SetStateAction, useState } from 'react';
import Button from './ui/Button'
import Heading from './ui/Heading';
import { useSetRecoilState } from 'recoil';
import { heroTitleinput, heroLinkinput } from './recoil/atoms';
import { Rocket } from "lucide-react";

const Hero = ({ setCurrent }: { setCurrent: Dispatch<SetStateAction<string>> }) => {
   const setHeroTitle = useSetRecoilState(heroTitleinput);
   const setHeroLink = useSetRecoilState(heroLinkinput);

   const [tempTitle] = useState<string | null>(null);
   const [tempLink] = useState<string | null>(null);

   const handleGetStarted = () => {
       setHeroTitle(tempTitle);
       setHeroLink(tempLink);
       setCurrent('register')
   }

   return (
       <div className='my-10 mx-auto w-full md:w-[70%] flex flex-col text-center items-center gap-10 overflow-x-hidden'>
            <Heading 
                variant='primary'
                size='md'    
                className="leading-tight"
            >
                Your <span className='font-font2 tracking-tight font-normal'>Digital</span> Mind:
                <br />
                <span className="text-xl md:text-2xl font-light">Save, Share, Revisit</span>
            </Heading>

            <div className='flex flex-col gap-3 mx-auto'>
                <Heading 
                    variant='secondary'
                    size='xs'
                    className='mx-auto text-sm md:text-base'
                >
                    Organize your thoughts, in a single click!
                </Heading>
               
                <div className='mx-auto rounded-full'>
                    <Button variant='secondary' onClick={handleGetStarted}>
                        <h1 className='text-sm md:text-base font-medium flex items-center gap-2'>
                            Get Started <Rocket size={18}/>
                        </h1>
                    </Button>        
                </div>
            </div>
        </div>
    )
}

export default Hero
