import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=74e7d4481bc74afd907166125c8102a3&page=1pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePreviousClick = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=74e7d4481bc74afd907166125c8102a3&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles})

    this.setState({
       page: this.state.page - 1,

    })
    

 
  }
  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=74e7d4481bc74afd907166125c8102a3&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({ articles: parsedData.articles })

      this.setState({
        page: this.state.page + 1,

      })
    }


  }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewsSpider - Top Headlines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>

        </div>
      </div>
    )
  }
}

export default News