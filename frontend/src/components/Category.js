import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
function Category(props) {
    const [blogs,setBlogs] = useState([]);
    const [currentCategory,setCurrentCategory] = useState('');

    useEffect(()=>{
        const category = props.match.params.id;
        setCurrentCategory(category);
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        };
        console.log(category);
        const fetchData = async()=>{
            try{
             const res= await axios.post(`${process.env.REACT_APP_URL}api/blog/category/`,{ category },config);
             setBlogs(res.data);
            }catch(err){
                alert(err);console.log(err);
            }
            
        }
        fetchData();
    },[props.match.params.id]);

    const capitalizeFirstLetter= (word)=>{
        if(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return '';
    };
    const getCategoryBlogs=()=>{
        let list = [];
        let result = [];

        blogs.map(blogPost=>{
            return list.push(
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                        <h3 className="mb-0">{blogPost.title}</h3>
                        <div className="mb-1 text-muted">{blogPost.month} {blogPost.date}</div>
                        <p className="card-text mb-auto">{blogPost.excerpt}</p>
                        <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="d-none d-lg-block">
                        <img width="300" height='250' src={"http://localhost:8000"+blogPost.thumbnail} alt="thumbnail"/>
                    </div>
                </div>
            )
        });
        for(let i =0; i < list.length; i+=2){
            result.push(
                <div className="row">
                    <div className="col-md-6">
                        { list[i] }
                    </div>
                    <div className="col-md-6">
                        { list[i+1] ? list[i+1]: null }
                    </div>
                </div>
            )
        }
        return result;
    }
    return (
        <div className="container mt-3">
            <h3 className="display-3">/categories / {capitalizeFirstLetter(currentCategory)}</h3>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to="/category/world">World</Link>
                    <Link className="p-2 text-muted" to="/category/environment">Environment</Link>
                    <Link className="p-2 text-muted" to="/category/technology">Technology</Link>
                    <Link className="p-2 text-muted" to="/category/design">Design</Link>
                    <Link className="p-2 text-muted" to="/category/culture">Culture</Link>
                    <Link className="p-2 text-muted" to="/category/business">Business</Link>
                    <Link className="p-2 text-muted" to="/category/politics">Politics</Link>
                    <Link className="p-2 text-muted" to="/category/opinion">Opinion</Link>
                    <Link className="p-2 text-muted" to="/category/science">Science</Link>
                    <Link className="p-2 text-muted" to="/category/health">Health</Link>
                    <Link className="p-2 text-muted" to="/category/style">Style</Link>
                    <Link className="p-2 text-muted" to="/category/travel">Travel</Link>
                </nav>
            </div>
            {getCategoryBlogs()}
        </div>
    )
};

export default Category
