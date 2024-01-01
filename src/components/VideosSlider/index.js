import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const VideosSlider = props => {
  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const {videoData} = props

  return (
    <>
      <Slider {...settings}>
        {videoData.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id}>
            <li className="each-item" key={each.id}>
              <img
                className="thumbnail"
                src={each.posterPath}
                alt={each.title}
              />
            </li>
          </Link>
        ))}
      </Slider>
    </>
  )
}

export default VideosSlider
