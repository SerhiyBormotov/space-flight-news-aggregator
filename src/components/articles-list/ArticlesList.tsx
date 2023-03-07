import { useEffect} from "react";
import { Grid } from "@mui/material";
import ArticlesListItem from "../articles-list-item/ArticlesListItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { useDispatch, useSelector } from "react-redux";
import { ArticleInterface } from "../../services/APIService";
import {  RootState } from "../../store/store";
import { fetchArticles, incrOffset } from "./articlesListSlice";

import './articles-list.scss';
import { Action, ThunkDispatch } from "@reduxjs/toolkit";


const ArticlesList = () => {
    const data = useSelector<RootState, ArticleInterface[]>( state => state.articles.data);
    const keywords = useSelector<RootState, string[]>( state => state.keywords.keywords);
    const count = useSelector<RootState, number>( state => state.articles.count);
    const offset = useSelector<RootState, number>( state => state.articles.offset);
    const dataError = useSelector<RootState, boolean>( state => state.articles.dataError);
    const dataLoading = useSelector<RootState, boolean>( state => state.articles.dataLoading);
    const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
    
   

    const handleScroll = (): void =>  {
        const currentPos = window.scrollY + window.innerHeight;
        if (document.body.scrollHeight - currentPos < 100) {
            dispatch(incrOffset());
          }            
    }

    useEffect(() => {
        dispatch(fetchArticles(keywords));
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [keywords, dispatch]);

     
    const content:React.ReactNode = data.slice(0, 6 + offset).map(item => {
        return(
            <Grid item xs={12} md={4} sm={6} key = {item.id}>
                 <ArticlesListItem article={item}  keywords={keywords}/>
            </Grid>
        )});
    
    
    return (
        <>
            <div className="articles-list__summary-bar">
                {dataLoading && 'Loading...'}
                {(dataError !== null) && 'Error'}
                {!(dataLoading || dataError) && `Results: ${count}`}
            </div>
            {(dataError !== null) && <Error/>}
            {(!(dataError || dataLoading) && (data.length > 0)) ?
            <Grid 
                container 
                spacing={4}
                alignItems="stretch"
                sx={{
                    marginTop: '0px'
                }}>
                    {content}
            </Grid> : null
            }
            {dataLoading && <Spinner/>}
        </>
    )
};

export default ArticlesList;