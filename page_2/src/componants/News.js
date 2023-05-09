import React, { Component } from 'react'
import Newsitem from './Newsitem';

export default class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7184566c1b174df5b8317a42bc61563e&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    pre = async()=> {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7184566c1b174df5b8317a42bc61563e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ 
            page : this.state.page - 1 ,
            articles: parsedData.articles
        })
    }

    next = async()=> {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7184566c1b174df5b8317a42bc61563e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        console.log("jikl")
        this.setState({ 
            page : this.state.page + 1 ,
            articles: parsedData.articles
        })
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 className='text-center'>News - Top Headlines</h1>
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.abcotvs.com/dip/images/12375444_102522-cc-dry-shampoo-recall-oct-2022-img.jpeg?w=1600"} newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                    <div className='container my-4 d-flex justify-content-between'>
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.pre}>&laquo;Previous</button>
                        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.next}>Next &raquo;</button>
                    </div>
                </div>
            </>
        )
    }
}
