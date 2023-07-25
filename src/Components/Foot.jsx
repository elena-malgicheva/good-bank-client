import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Foot () {
    return (
        <div className="fixed-bottom clearfix foot">
            <div className="float-start p-1">by Elena Malgicheva</div>
            <div className="float-end p-1">
                <FaLinkedin className='icon'/>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/elena-malgicheva/">LinkedIn</a>
                
            </div>
            <div className="float-end p-1"> 
                <FaGithub className='icon'/>
                <a target="_blank" rel="noreferrer" href="https://elena-malgicheva.github.io/">GitHub</a>
            </div>
        </div>
    )
}