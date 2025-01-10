import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor(props) {
    super(props);
    console.log("Hello I am from constructor");
    this.state = {
      articles:[],
      page : 1,
      loading: false,
      totalResults: 0
    };
  }

  
  
  async updateNews() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a91ce81f01441958c5d45187644cc32&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false, // Set loading to false after data is fetched
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a91ce81f01441958c5d45187644cc32&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false, // Set loading to false after data is fetched
    });  
  };

  render() {
    return (
      <div>
        <h1 className="text-center">NewsGain - Top Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}

        < InfiniteScroll
          dataLength={this.state.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles?.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
          {this.state.articles?.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}

                />
              </div>

            ))
          }
            <p>No articles found</p>
        </div>
             
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;