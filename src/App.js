import React, { Component } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import { BiSearchAlt } from 'react-icons/bi';
import { RiInformationLine } from 'react-icons/ri';
import { AiFillPushpin, AiOutlinePushpin, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoIosCopy, IoMdCopy } from 'react-icons/io';
import { createOneToOnemapping, localesArray } from './CategoryObject';
import LinkedinIcon from './linkedin.svg';
import GithubIcon from './github.svg';

const faker = require('faker');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchGlassClick: false,
            pinned: [],
            locales: [...localesArray],
            categories: createOneToOnemapping(),
            searchedCategories: [],
            searchedIndex: -1,
            copyIndex: -1,
            pinCopyIndex: -1,
            locale: 'en_IND',
            field: '',

            dragOn: false,
            infoClicked: false,
        };
    }

    componentDidMount() {
        console.log('DataEntry Extension actually started');
        if (localStorage.getItem('locales') !== null) {
            this.setState({ locales: JSON.parse(localStorage.getItem('locales')) });
        }

        if (localStorage.getItem('categories') !== null) {
            this.setState({ categories: JSON.parse(localStorage.getItem('categories')) });
        }

        if (localStorage.getItem('pinned') !== null) {
            this.setState({ pinned: JSON.parse(localStorage.getItem('pinned')) });
        }

        if (localStorage.getItem('locale') !== null) {
            this.setState({ locale: localStorage.getItem('locale') });
        }
    }

    handlePinToAll = (index) => {
        const { categories, pinned } = this.state;
        let temp = pinned[index];
        temp.pinned = false;
        pinned.splice(index, 1);
        categories.unshift(temp);
        this.setState({ pinned, categories, copyIndex: -1, pinCopyIndex: -1, searchedIndex: -1 });
    };

    handlePinToPinned = (index) => {
        const { categories, pinned } = this.state;
        let temp = categories[index];
        temp.pinned = true;
        categories.splice(index, 1);
        pinned.unshift(temp);
        this.setState({ pinned, categories, copyIndex: -1, pinCopyIndex: -1, searchedIndex: -1 });
    };

    handleSearchQuery = (e) => {
        const { categories, pinned, searchedCategories } = this.state;
        searchedCategories.splice(0, searchedCategories.length);
        if (e.target.value !== '') {
            categories.map((value, index) =>
                value.value.toLowerCase().includes(e.target.value.toLowerCase()) ? searchedCategories.push(value) : null
            );
            pinned.map((value, index) => (value.value.toLowerCase().includes(e.target.value.toLowerCase()) ? searchedCategories.push(value) : null));
        }
        this.setState({ searchedCategories, copyIndex: -1, pinCopyIndex: -1, searchedIndex: -1 });
    };

    handleCopyToClipBoard = () => {
        navigator.clipboard.writeText(this.state.field).then(
            function () {
                /* clipboard successfully set */
            },
            function () {
                /* clipboard write failed */
            }
        );
    };

    handleClose = () => {
        let myobj = document.getElementById('windowFrame');
        myobj.remove();

        localStorage.setItem('categories', JSON.stringify(this.state.categories));
        localStorage.setItem('locales', JSON.stringify(this.state.locales));
        localStorage.setItem('pinned', JSON.stringify(this.state.pinned));
        localStorage.setItem('locale', this.state.locale);
    };

    handleStart = () => {
        //
        this.setState({ dragOn: true });
    };

    handleDrag = () => {
        //
    };

    handleStop = () => {
        //
        this.setState({ dragOn: false });
    };

    handleInfoClicked = () => {
        this.setState({ infoClicked: this.state.infoClicked ? false : true });
    };

    render() {
        const cssStyle = {
            cursor: this.state.dragOn ? 'grabbing' : null,
        };
        return (
            <Draggable
                axis='both'
                handle='.dragBox'
                defaultPosition={{ x: 0, y: 0 }}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className='dragBox' style={{ ...cssStyle }}>
                    <div className={this.state.infoClicked ? 'infoContent infoContentActive' : 'infoContent'}>
                        <div className='name'>
                            <span style={{ fontSize: '15px', color: 'white' }}> Created by</span> <br /> Omkar Ajagunde
                        </div>
                        <div className='infoDetails'>
                            This tool is a Open Source free of cost project that includes over 135 + categories to generate fake data which is
                            realistic, so dont waste time switching 100's of tabs to generate lorem Ipsum, instead quickly grab realistic data without
                            leaving the current tab
                            <br />
                            <br />
                            Special Thanks to <span style={{ color: '#bcfaf7', fontSize: '20px' }}>faker.js</span>
                            without which this tool was impossible
                        </div>
                        <div className='social'>
                            <a href='https://www.linkedin.com/in/omkarajagunde/'>
                                <img
                                    src={LinkedinIcon}
                                    alt=''
                                    style={{
                                        width: '30px',
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                        padding: '5px 5px',
                                        borderRadius: '5px',
                                        marginRight: '5px',
                                    }}
                                />
                            </a>
                            <a href='https://github.com/omkarajagunde'>
                                <img
                                    src={GithubIcon}
                                    alt=''
                                    style={{ width: '30px', cursor: 'pointer', backgroundColor: 'white', padding: '5px 5px', borderRadius: '5px' }}
                                />
                            </a>
                        </div>
                        <span className='iconCredits'>Icons by flaticon.com</span>
                    </div>
                    <span className='closeBtn' onClick={() => this.handleClose()} style={{ cursor: 'pointer' }}>
                        X
                    </span>
                    <div className='mainContent'>
                        <span style={{ display: 'flex' }}>
                            <div className='info' onClick={this.handleInfoClicked}>
                                {this.state.infoClicked ? <AiOutlineCloseCircle className='infoIcon' /> : <RiInformationLine className='infoIcon' />}
                            </div>

                            {this.state.searchGlassClick ? (
                                <AiOutlineCloseCircle
                                    className='searchIcon'
                                    onClick={() => {
                                        const { searchedCategories } = this.state;
                                        searchedCategories.splice(0, searchedCategories.length);
                                        this.setState({ searchGlassClick: this.state.searchGlassClick ? false : true, searchedCategories });
                                    }}
                                />
                            ) : (
                                <BiSearchAlt
                                    className='searchIcon'
                                    onClick={() => {
                                        this.setState({ searchGlassClick: this.state.searchGlassClick ? false : true });
                                    }}
                                />
                            )}

                            <input
                                id='inputBar'
                                type='text'
                                placeholder='Search'
                                onChange={(e) => this.handleSearchQuery(e)}
                                className={this.state.searchGlassClick ? 'searchBar active' : 'searchBar'}
                            />

                            <select
                                name='locale'
                                id='locale'
                                onChange={(e) => (faker.locale = e.target.value)}
                                className={this.state.searchGlassClick ? 'locale-select locale-active' : 'locale-select'}>
                                <option value='locale'>{this.state.locale}</option>
                                {this.state.locales.map((value, index) => (
                                    <option value={value} key={index}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </span>

                        <div className='fakeContent'>
                            {this.state.searchedCategories.length > 0 ? (
                                <>
                                    <h3 style={{ marginLeft: '10px' }}> Searched Categories</h3>
                                    {this.state.searchedCategories.map((value, index) => (
                                        <>
                                            <div className='fakePinnedCards' key={index + '' + value.value}>
                                                <div className='nameCard'>{value.value}</div>

                                                <div
                                                    className='copy'
                                                    onClick={() => {
                                                        let category = value.category;
                                                        let name = value.value;
                                                        this.setState(
                                                            {
                                                                searchedIndex: index,
                                                                pinCopyIndex: -1,
                                                                copyIndex: -1,
                                                                field: faker.fake(`{{${category}.${name}}}`),
                                                            },
                                                            () => this.handleCopyToClipBoard()
                                                        );
                                                    }}>
                                                    {this.state.searchedIndex === index ? <IoIosCopy /> : <IoMdCopy />}
                                                </div>

                                                <div
                                                    className='option'
                                                    onClick={() => (value.pinned ? this.handlePinToAll(index) : this.handlePinToPinned(index))}>
                                                    {value.pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
                                                </div>
                                            </div>
                                            {this.state.searchedIndex === index ? (
                                                <div className='cardExplorer'>
                                                    <div className='copiedText'>Copied ... </div>
                                                    <h4 id='copyText'>{this.state.field}</h4>
                                                </div>
                                            ) : null}
                                        </>
                                    ))}
                                </>
                            ) : null}

                            <h3 style={{ marginLeft: '10px' }}> Pinned Categories</h3>
                            {this.state.pinned.length > 0 ? (
                                this.state.pinned.map((value, index) => (
                                    <>
                                        <div className='fakePinnedCards' key={index + '' + value.value}>
                                            <div className='nameCard'>{value.value}</div>

                                            <div
                                                className='copy'
                                                onClick={() => {
                                                    let category = value.category;
                                                    let name = value.value;
                                                    this.setState(
                                                        {
                                                            pinCopyIndex: index,
                                                            copyIndex: -1,
                                                            searchedIndex: -1,
                                                            field: faker.fake(`{{${category}.${name}}}`),
                                                        },
                                                        () => this.handleCopyToClipBoard()
                                                    );
                                                }}>
                                                {this.state.pinCopyIndex === index ? <IoIosCopy /> : <IoMdCopy />}
                                            </div>
                                            <div className='option' onClick={() => this.handlePinToAll(index)}>
                                                {value.pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
                                            </div>
                                        </div>
                                        {this.state.pinCopyIndex === index ? (
                                            <div className='cardExplorer'>
                                                <div className='copiedText'>Copied ... </div>
                                                <h4 id='copyText'>{this.state.field}</h4>
                                            </div>
                                        ) : null}
                                    </>
                                ))
                            ) : (
                                <div className='fakePinnedCards'>Nothing pinned yet</div>
                            )}

                            <h3 style={{ marginLeft: '10px' }}> All Categories</h3>
                            {this.state.categories.map((value, index) => (
                                <>
                                    <div className='fakeCards' key={index}>
                                        <div className='nameCard'>{value.value}</div>
                                        <div
                                            className='copy'
                                            onClick={() => {
                                                let category = value.category;
                                                let name = value.value;
                                                this.setState(
                                                    {
                                                        copyIndex: index,
                                                        pinCopyIndex: -1,
                                                        searchedIndex: -1,
                                                        field: faker.fake(`{{${category}.${name}}}`),
                                                    },
                                                    () => this.handleCopyToClipBoard()
                                                );
                                            }}>
                                            {this.state.copyIndex === index ? <IoIosCopy /> : <IoMdCopy />}
                                        </div>
                                        <div className='option' onClick={() => this.handlePinToPinned(index)}>
                                            {value.pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
                                        </div>
                                    </div>
                                    {this.state.copyIndex === index ? (
                                        <div className='cardExplorer'>
                                            <div className='copiedText'>Copied ... </div>
                                            <h4 id='copyText'>{this.state.field}</h4>
                                        </div>
                                    ) : null}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}
