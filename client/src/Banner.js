import { Link } from "react-router-dom";
import banner from './banner.png';

const Banner = () => {
    return (
        <div className="banner">
            <Link to="/"><img alt="Possum Pals!" src={banner} /></Link>
        </div>
    )
}

export default Banner;