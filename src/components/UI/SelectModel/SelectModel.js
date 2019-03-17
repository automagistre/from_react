import React, {Component} from 'react'

import './slick-slider.less'
import './SelectModel.less'

import Slider from 'react-slick'
import {carManufactures} from "../../../vars/manufactures";
import {services} from "../../../vars/company";

function CustomArrow(props) {
    const { className, onClick } = props;
    return (
        <button type='button' className={className} onClick={onClick} />
    );
}

class SelectModel extends Component {
    carManufactures = carManufactures
    services = services
    state = {
        friezeChoice: false
    }

    friezeChoiceToggle = () => {
        this.setState({
            friezeChoice: !this.state.friezeChoice
        })
    }

    renderServices = links => links.map((value , key) =>{
        return (
            <a className="btn btn_shmatn sec-start__btn" key={key} href="#">
                <i className={value.icon} />
                {value.name}
            </a>
        )
    } )

    renderCarBlock = cars => cars.map((value, key) => {
        let cls = value.cls
        return (
            <div className={`sec-start__slide st-${cls}`} key={key}>
                <div className={`sec-start__slide-logo st-${cls}__logo`} />
                <div className={`sec-start__slide-car st-${cls}__car`}>
                    <div className={`sec-start__slide-wheel st-${cls}__wheel-lt`} />
                    <div className={`sec-start__slide-wheel st-${cls}__wheel-rt`} />
                    <div className="sec-start__slide-btns">
                        {this.renderServices(this.services)}
                    </div>
                </div>
                <div className="sec-start__slide-btm">
                    <a className="btn btn_big sec-start__slide-btn" onClick={this.friezeChoiceToggle} role="button">Выбрать {value.name}</a>
                </div>
            </div>
        )
    })

    renderNavBlock = cars => {
        let brands = cars.map((value, key) => {
            let cls = "sec-start__nav-link icon-" + value.cls
            return (
                <a className={cls} key={key} role="button" onClick={ () => this.slider.slickGoTo(key)}/>
            )
        })
        brands.push(
                <a className="sec-start__nav-link icon-all" key={brands.length + 1} href="/09_All-brands.html">
                    <div className="sec-start__nav-tooltip" data-text="Японские и&nbsp;корейские машины"/>
                </a>
        )
        return brands
    }

    render() {
        const slickOptions = {
            arrows: true,
            dots: false,
            infinite: true,
            speed: 0,
            fade: true,
            autoplay: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: <CustomArrow className='slick-arrow slick-prev'/>,
            nextArrow: <CustomArrow className='slick-arrow slick-next'/>,
            responsive: [
                { breakpoint: 768, settings: { arrows: false } }
            ],
            // beforeChange: (current, next) => this.setState({ activeSlide: next })
        }
        let cls = "sec-start__select "
        if (this.state.friezeChoice) {
            cls += "is-frozen"
        }
        return (
                <div className="sec-start__body">
                        <div className={cls}>
                        <a className="btn btn_gray btn_arrow-lt sec-start__back" role="button"
                           onClick={this.friezeChoiceToggle}>
                            Назад
                        </a>
                        <h1 className="sec-start__title">Выберите <br /> интересующее направление:</h1>
                        <Slider className="sec-start__slider" {...slickOptions}
                                ref={slider => (this.slider = slider)}>
                            {this.renderCarBlock(this.carManufactures)}
                        </Slider>
                        <nav className="sec-start__nav">
                            {this.renderNavBlock(this.carManufactures)}
                        </nav>
                    </div>
                </div>
        )
    }
}

export default SelectModel