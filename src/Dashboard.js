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
    let lastCard = document.querySelector('div.card-main-wrapper:last-of-type');
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
      return (
        <div className="card-main-wrapper" key={index}>
          <div className="top-card-wrapper position-relative">
            <img src={collegePic} alt={`College${index}`} />
            <div className="backdrop position-absolute" />
            <button
              type="button"
              className="img-button-white-one position-absolute"
            >
              Best college 2018
            </button>
            <button
              type="button"
              className="img-button-white-two position-absolute"
            >
              2 Kms away
            </button>
            <p className="ranking-text position-absolute">
              #7 in 260 colleges in north campus
            </p>
            <button className="rating-img-top position-absolute">
              <span className="rate">
                {" "}
                <span className="variable">3.9</span>
                <span>/5</span>
              </span>
              <span className="comment">Very Good</span>
            </button>
            <div className="promoted-text position-absolute">PROMOTED</div>
            {/* <div class="arrow-up-1 position-absolute"></div>
                <div class="arrow-up-2 position-absolute"></div> */}
            <div className="arrow-right position-absolute" />
          </div>
          <div className="bottom-card-wrapper">
            <div className="bottom-upper-wrapper">
              <div className="bottom-left-card">
                <div className="d-flex mb-7">
                  <p className="college-name">
                    Hansraj College Delhi University
                  </p>{" "}
                  <p>*****</p>
                </div>
                <div className="d-flex mb-7 location">
                  <p>Near Vishwavidyalya Metro Station</p>{" "}
                  <span className="ml-2"> | </span>{" "}
                  <span className="ml-2 light">2 Kms away from bus stand</span>
                </div>
                <div className="d-flex mb-7 location">
                  <span className="green">93% Match :</span>{" "}
                  <span className="dark ml-2">2.5kms</span>{" "}
                  <span className="ml-2">from GTB Nagar</span>{" "}
                  <span className="dark ml-2">7 Kms</span>{" "}
                  <span className="ml-2">from Rajiv Chowk</span>
                </div>
              </div>
              <div className="bottom-right-card">
                <div className="d-flex right-flex">
                  <span className="strike">₹6,8756</span>{" "}
                  <div className="red-box">
                    20 <div className="arrow-left position-absolute" />
                  </div>
                </div>
                <div className="price">
                  <span> ₹5,768</span>
                </div>
                <div className="duration">
                  <span>Per Semester(3 Months)</span>
                </div>
              </div>
            </div>
            <div className="bottom-lower-wrapper d-flex">
              <div className="bottom-lower-left">
                <span>Flat</span> <span className="dark">Rs</span>{" "}
                <span className="dark green">2,000</span>{" "}
                <span className="dark">off + upto Rs</span>{" "}
                <span className="dark">500</span>{" "}
                <span className="dark">wallet! to avail...</span>{" "}
                <span className="dark blue ml-2">LOGIN</span>
              </div>
              <div className="bottom-lower-right">
                <span>Free Cancellation</span> <span>.</span>{" "}
                <span>Free Wi-Fi</span>
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
            <div className="main-cards-wrapper">
              {showCollegeCards}
            </div>
            <h1 className="text-center">THE END !!!</h1>
          </div>
        </main>
      </>
    );
  }
}

export default Dashboard;
