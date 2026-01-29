import Typewriter from 'typewriter-effect';

//  picture ####################################
import devPic from '..//assets/mypic.jpeg'

//  icons   ####################################
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#100d74] text-[#ffffff]">
            {/* profile Image  */}
            <img
                src={devPic}
                alt="My profile"
                className="w-48 h-48 rounded-full shadow-lg mb-6"
            />

            {/* name */}
            <Typewriter
                options={{
                    strings: ["Hi, I am Junui Hong", "Software Developer/Engineer"],
                    autoStart: true,
                    loop: true,
                    cursor: '\u200B',
                    delay: 50,
                    deleteSpeed: 5,
                    wrapperClassName: "text-2xl md:text-2xl font-bold tracking-wide",
                    cursorClassName: "text-2xl md:text-2xl font-bold",
                }}
            />

            {/* social links */}
            <div className="flex gap-6 mt-8">
                <a href="https://github.com/junuiui" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-8 h-8 text-white hover:scale-200 transition-transform" />
                </a>
                <a href="https://linkedin.com/in/junui-hong-338487280/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-8 h-8 text-white hover:scale-200 transition-transform" />
                </a>
                <a href="https://instagram.com/junuiui" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-8 h-8 text-white hover:scale-200 transition-transform" />
                </a>
            </div>

            {/* Resume download button */}
            <div className="mt-12">
                <a
                    href="/resume_jun_swe-2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 px-6 py-3 bg-white text-[#100d74] text-lg rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                    View Resume
                </a>
            </div>
        </div>
    );
}

