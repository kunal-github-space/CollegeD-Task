import React, { Component } from "react";
import CollegeData from "./StaticsData/colleges.json";
import collegePic from "./StaticsData/college_01.jpg";

class Dashboard extends Component {
  state = { colleges: [], startingIndex: 0, endingIndex: 10 };

  fetchDataInitial = () => {
    const { startingIndex, endingIndex } = this.state;

    let mininalColleges = CollegeData.colleges.slice(
      startingIndex,
      endingIndex
    );

    this.setState({ colleges: mininalColleges });
  };

  loadMoreData = () => {
    if (CollegeData.colleges.length === this.state.startingIndex + 10) {
      return;
    } else {
      this.setState(
        {
          startingIndex: this.state.startingIndex + 10,
          endingIndex: this.state.endingIndex + 10,
        },
        () => {
          let moreData = CollegeData.colleges.slice(
            this.state.startingIndex,
            this.state.endingIndex
          );
          let finalData = [...this.state.colleges, ...moreData];
          this.setState({ colleges: finalData });
        }
      );
    }
  };

  handleScroll = (e) => {
    // console.log("Scrolled !!!!");
    let lastCard = document.querySelector("div.card-main-wrapper:last-of-type");
    const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;
    if (pageOffset > lastCardOffset - bottomOffset) {
      this.loadMoreData();
    }
  };

  componentDidMount = () => {
    this.fetchDataInitial();
    this.scrollListener = window.addEventListener("scroll", (e) => {
      this.handleScroll(e);
    });
  };

  render() {
    const { colleges } = this.state;

    const showCollegeCards = colleges.map((item, index) => {
      let nearest = item.famous_nearest_places;
      let nearestArray = nearest.split(" ");

      let offerText = item.offertext;
      let offerArray = offerText.split(" ");
      console.log(offerArray);

      return (
        <div className="card-main-wrapper" key={index}>
          <div className="top-card-wrapper position-relative">
            <img src={collegePic} alt={`College${index}`} />
            <div className="backdrop position-absolute" />
            <button
              type="button"
              className="img-button-white-one position-absolute"
            >
              {item.tags[0]}
            </button>
            <button
              type="button"
              className="img-button-white-two position-absolute"
            >
              {item.tags[1]}
            </button>
            <p className="ranking-text position-absolute">#{item.ranking}</p>
            <button className="rating-img-top position-absolute">
              <span className="rate">
                {" "}
                <span className="variable">{item.rating}</span>
                <span>/5</span>
              </span>
              <span className="comment">{item.rating_remarks}</span>
            </button>
            <div className="promoted-text position-absolute">PROMOTED</div>
            <div className="arrow-right position-absolute" />
          </div>
          <div className="bottom-card-wrapper">
            <div className="bottom-upper-wrapper">
              <div className="bottom-left-card">
                <div className="d-flex mb-7">
                  <p className="college-name">{item.college_name}</p>{" "}
                  <p className="ml-2">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star non-checked"></span>
                  </p>
                </div>
                <div className="d-flex mb-7 location">
                  <p>{item.nearest_place[0]}</p>{" "}
                  <span className="ml-2"> | </span>{" "}
                  <span className="ml-2 light">{item.nearest_place[1]}</span>
                </div>
                <div className="d-flex mb-7 location">
                  <span className="green">93% Match :</span>{" "}
                  <span className="dark ml-2">{nearestArray[0]}</span>{" "}
                  <span className="ml-2">{`${nearestArray[1]} ${nearestArray[2]} ${nearestArray[3]}`}</span>{" "}
                  <span className="dark ml-2">{`${nearestArray[4]} ${nearestArray[5]}`}</span>{" "}
                  <span className="ml-2">{`${nearestArray[6]}  ${nearestArray[7]} ${nearestArray[8]}`}</span>
                </div>
              </div>
              <div className="bottom-right-card">
                <div className="d-flex right-flex">
                  <span className="strike">₹{item.original_fees}</span>{" "}
                  <div className="red-box">
                    {item.discount}{" "}
                    <div className="arrow-left position-absolute" />
                  </div>
                </div>
                <div className="price">
                  <span> ₹{item.discounted_fees}</span>
                </div>
                <div className="duration">
                  <span>{item.fees_cycle}</span>
                </div>
              </div>
            </div>
            <div className="bottom-lower-wrapper d-flex">
              <div className="bottom-lower-left">
                <span>{offerArray[0]}</span> <span className="dark">{offerArray[0]}</span>{" "}
                <span className="dark green">{offerArray[2]}</span>{" "}
                <span className="dark">{`${offerArray[3]} ${offerArray[4]} ${offerArray[5]} ${offerArray[6]}`}</span>{" "}
                <span className="dark">{`${offerArray[7]}`}</span>{" "}
                <span className="dark">{`${offerArray[8]} ${offerArray[9]} ${offerArray[10]}`}</span>{" "}
                <span className="dark blue ml-2">{offerArray[11]}</span>
              </div>
              <div className="bottom-lower-right">
                <span>{item.amenties[0]}</span> <span>.</span>{" "}
                <span>{item.amenties[1]}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        <main>
          <div className="container">
            <div className="main-heading py-50">
              <p className="heading">Colleges in North India</p>
            </div>
            <div className="main-cards-wrapper">{showCollegeCards}</div>
            <h1 className="text-center">THE END !!!</h1>
          </div>
        </main>
      </>
    );
  }
}

export default Dashboard;
