import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AppData } from '../../util/AppData'

import { showMoreAriticleAction } from '../actions/articles'

import InvalidUrlBox from '../containers/InvalidUrlBox'
import ArticleList from '../components/ArticleList'
import CurrentTagChain from '../components/CurrentTagChain'

import { INVALED_TAG_URL_TIP } from '../../consts/text'

class ArticleListBox extends Component {
    constructor() {
        super()
    }
    render() {
        let { articles, tags, showMoreAriticle, showedArticlesMaxNumber } = this.props
        const tagId = this.props.params.tagId

        let showedArticles
        // url in /tag/:tagId
        if (tagId !== undefined) {
            showedArticles = AppData.getArticlesByTagId(articles, tags, tagId)
            // tagId is illeagal
            if (showedArticles === undefined) {
                return (
                    <InvalidUrlBox info={INVALED_TAG_URL_TIP} />
                )
            }
        }
        // url in routes root or blog etc show allArticles
        if (tagId === undefined) {
            showedArticles = articles
        }

        return (
            <div>
                <CurrentTagChain tags={tags} currentTagId={tagId} />
                <ArticleList showedArticles={showedArticles}
                    showMoreAriticle={showMoreAriticle}
                    showedArticlesMaxNumber={showedArticlesMaxNumber} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tags: state.data.get('tags').toJS(),
        articles: state.data.get('articles').toJS(),
        showedArticlesMaxNumber: state.data.get('showedArticlesMaxNumber')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showMoreAriticle: bindActionCreators(showMoreAriticleAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListBox)