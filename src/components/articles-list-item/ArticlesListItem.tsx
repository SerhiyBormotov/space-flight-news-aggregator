import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link as RouterLink} from 'react-router-dom';
import { Card, CardMedia, Link, CardContent} from '@mui/material';
import Highlighter  from 'react-highlight-words';
import './articles-list-item.scss';

import { ArticleInterface } from '../../services/APIService';

const CalendarIcon = () => {
    return(
        <svg className='calendar-icon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6" clipPath="url(#clip0_466_269)">
                <path d="M12 2.66675H3.99998C2.52722 2.66675 1.33331 3.86066 1.33331 5.33341V12.0001C1.33331 13.4728 2.52722 14.6667 3.99998 14.6667H12C13.4727 14.6667 14.6666 13.4728 14.6666 12.0001V5.33341C14.6666 3.86066 13.4727 2.66675 12 2.66675Z" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33331 1.33337V4.00004" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6666 1.33337V4.00004" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.33331 6.66675H14.6666" stroke="#363636" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_466_269">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    )
};

type ArticlesListItemProp = {
    article: ArticleInterface,
    keywords?: Array<string>
} ;
const ArticlesListItem = ({article, keywords = []}: ArticlesListItemProp) => {
    let {id, description, title, published, image} = article;
    const publishedDate = new Date(published);


    if (description.length > 200) {
        description = description.slice(0, 200) + "...";
    }
    enum Months{
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    };

    return(
        <Card
            sx={{
                boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.05)",
                border: "1px solid #EAEAEA",
                height: "100%"
            }}
            key={id}>
            <CardMedia
            sx={{height: 217, backgroundColor: "#C4C4C4"}}
            image={image}
            title={title}
            />
            <CardContent
                sx={{
                    padding: "25px",
                    color: "#363636",
                }}>
                <div className="articles-list-item__date"><CalendarIcon/> {`${Months[publishedDate.getMonth()]} ${publishedDate.getDay()}th, ${publishedDate.getFullYear()}`}</div>
                <div className="articles-list-item__title">
                    <Highlighter
                        highlightClassName="articles-list-item__highlight"
                        searchWords={keywords}
                        textToHighlight={title}
                    />
                </div>
                <div className="articles-list-item__description">
                    <Highlighter
                        highlightClassName="articles-list-item__highlight"
                        searchWords={keywords}
                        textToHighlight={description}
                    />
                </div>
                <div className="articles-list-item__actions">
                    <Link 
                        component={RouterLink}
                        to={`/${id}`} 
                        underline="hover" 
                        color="#363636"
                        sx={{fontWeight: "bold"}}
                        >
                            Read more 
                            <ArrowForwardIcon 
                                sx={{
                                    fontSize: "16px",
                                    position:"relative",
                                    top: "3px",
                                    left: "5px"
                                }}/>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
};

export default ArticlesListItem;