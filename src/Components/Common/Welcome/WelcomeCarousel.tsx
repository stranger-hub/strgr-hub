import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import Image from 'next/image';

export default function WelcomeCarousel() {
    const carouselData = [
        {
            imageSrc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            heading: "Connect with People Worldwide",
            description: "Meet and chat with people from all over the globe in real-time."
        },
        {
            imageSrc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            heading: "Random Matching",
            description: "Enjoy exciting and spontaneous conversations with new people."
        },
        {
            imageSrc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            heading: "Private and Secure",
            description: "Your chats and video calls are encrypted and safe with us."
        },
        {
            imageSrc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            heading: "Easy to Use",
            description: "Start a video or text chat with just a few clicks!"
        },
        {
            imageSrc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            heading: "Customize Your Experience",
            description: "Set your preferences to connect with people who share your interests."
        },
    ];


    return (
        <div className='mb-5 md:text-left'>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                className="mySwiper"
                autoplay
            >
                <div>
                    {carouselData.map((data) => (
                        <SwiperSlide key={data.heading}>
                            <div className="card md:card-side bg-base-100 shadow-xl">
                                <figure>
                                    <Image
                                        width={300}
                                        height={350}
                                        src={data.imageSrc}
                                        alt={`Album_${data.heading}`}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title"><p className='text-center md:text-left'>{data.heading}</p></h2>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    )
}
