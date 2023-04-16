import React, { Component } from 'react'
import GameService from '../services/GameService';
import {
    Button,
    InputGroup,
    FormControl,
    FormGroup,
    Card
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../form/game/Container";
import "../form/style.css";
import S3FileUpload from 'react-s3';
//Optional Import
import { uploadFile } from 'react-s3';
import {BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SC_ACCESS_KEY} from "../constance/ApiURL";

const validTypeFiles = ['image/jpg', 'image/jpeg', 'image/png'];
 
const config = {
    bucketName: BUCKET_NAME,
    // dirName: 'photos', /* optional */
    region: BUCKET_REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SC_ACCESS_KEY
}

const gameNull = {
    "gameName": "",
    "gameDescription": "",
    "releaseDate": "",
    "releaseLocation": "",
    "typeId": ""
}

class ListGameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: [],
            val: "",
            currentPage: 1,
            gamesPerPage: 5,
            totalGame: undefined,
            totalPages: undefined
        }
        this.addGame = this.addGame.bind(this);
        this.editGame = this.editGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    }

    deleteGame(id) {
        GameService.deleteGame(id).then(res => {
            this.setState({ 
                games: this.state.games.filter(game => game.id !== id),
                totalGame: this.state.totalGame - 1,
                currentPage: 1,
                totalPages: Math.ceil(this.state.totalGame/ this.state.gamesPerPage),
                val: ""
            }, () => {
                window.location.reload();
                return;
            });
        });
    }
    viewGame(id) {
        this.props.history.push(`/view-game/${id}`);
    }
    editGame(id, e) {
        e.preventDefault(e);
        const game = {
            "gameName": e.target.gameName.value,
            "gameDescription":  e.target.gameDescription.value,
            "releaseDate":  e.target.releaseDate.value,
            "releaseLocation":  e.target.releaseLocation.value,
            "typeId":  e.target.typeId.value
        }
        // console.log(game)
        // return;

        GameService.updateGame(id, game).then((res) => {
            if (res.status == 200) {
                // window.location.reload();
                return;
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        GameService.getTotalNumberOfGame(this.state.val).then((res) => {
            this.setState({totalGame: res.data} , () => {
                var x = Math.ceil(this.state.totalGame / this.state.gamesPerPage);
                this.setState({totalPages: x}, () => {
                    this.forceUpdate();
                });
            })
        }).catch (error => {
            // window.location.replace("/access-denied");
        })

        GameService.getGames(this.state.gamesPerPage, this.state.currentPage - 1).then((res) => {
            this.setState({ games: res.data })
        }).catch (error => {
            // window.location.replace("/access-denied");
        });
    }

    addGame(e) {
        e.preventDefault(e);
        const game = {
            "gameName": e.target.gameName.value,
            "gameDescription":  e.target.gameDescription.value,
            "releaseDate":  e.target.releaseDate.value,
            "releaseLocation":  e.target.releaseLocation.value,
            "typeId":  e.target.typeId.value
        }
        // console.log(game)
        // return;

        GameService.createGame(game).then((res) => {
            if (res.status == 200) {
                // window.location.reload();
                return;
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    inputSearch = (event) => {
        this.setState({val: event.target.value})
    }

    doFilter = () => {
        GameService.getTotalNumberOfGame(this.state.val).then((res) => {
            this.setState({totalGame: res.data} , () => {
                var x = Math.ceil(this.state.totalGame / this.state.gamesPerPage);
                this.setState({totalPages: x}, () => {
                    GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, 0).then((res) => {
                        this.setState({ games: res.data, currentPage: 1}, () => {
                            this.forceUpdate();
                        });
                    }).catch((error) => {
                        if (error) {
                            this.setState({games: []});
                        }
                    });
                    this.forceUpdate();
                });
            })
        })
    }

    cancelSearch = () => {
        this.setState({ val: '' }, () => {
            GameService.getTotalNumberOfGame(this.state.val).then((res) => {
                this.setState({totalGame: res.data} , () => {
                    var x = Math.ceil(this.state.totalGame / this.state.gamesPerPage);
                    this.setState({totalPages: x}, () => {
                        GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, 0).then((res) => {
                            this.setState({ games: res.data, currentPage: 1}, () => {
                                this.forceUpdate();
                            });
                        }).catch((error) => {
                            if (error) {
                                this.setState({games: []});
                            }
                        });
                        this.forceUpdate();
                    });
                })
            })
        })
    }

    firstPage = () => {
        if (this.state.currentPage > 0) {
            GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, 0).then((res) => {
                this.setState({ games: res.data }, () => {
                    this.setState({currentPage: 1}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                window.location.replace("/access-denied");
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 0) {
            GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, this.state.currentPage - 2).then((res) => {
                this.setState({ games: res.data }, () => {
                    this.setState({currentPage: this.state.currentPage - 1}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                window.location.replace("/access-denied");
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < this.state.totalPages) {
            GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, this.state.totalPages - 1).then((res) => {
                this.setState({ games: res.data }, () => {
                    this.setState({currentPage: this.state.totalPages}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                window.location.replace("/access-denied");
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < this.state.totalPages) {
            GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, this.state.currentPage).then((res) => {
                this.setState({ games: res.data }, () => {
                    this.setState({currentPage: this.state.currentPage + 1}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                window.location.replace("/access-denied");
            });
        }
    };

    changePage = (event) => {
        if (event.key == "Enter") {
            var input = event.target.value;
            input = input <= 0 ? 1 : (input > this.state.totalPages ? this.state.totalPages : input);
            GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, input - 1).then((res) => {
                this.setState({ games: res.data }, () => {
                    this.setState({currentPage: input}, () => {
                        event.target.value = input;
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                window.location.replace("/access-denied");
            });
        }
    }

    onSubmit = (event) => {
        event.preventDefault(event);
        this.forceUpdate()
    };

    convertToDate = (data) => {
        if (data == null) {
            return null;
        }
        const a = data[0]
        const b = data[1]
        const c = data[2]
        return a+'-'+b+'-'+c
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            GameService.getGameByFilter(this.state.val, this.state.gamesPerPage, 0).then((res) => {
                this.setState({ games: res.data }, () => {
                    GameService.getTotalNumberOfGame(this.state.val).then((res) => {
                        this.setState({ totalGame: res.data}, () => {
                            var x = Math.ceil(this.state.totalGame / this.state.gamesPerPage);
                            this.setState({totalPages: x, currentPage: 1}, () => {
                                this.forceUpdate();
                            });
                        })
                    }).catch (error => {
                        window.location.replace("/access-denied");
                    })
                });
            }).catch((error) => {
                if (error) {
                    this.setState({ employees: [] });
                }
            });
        }
    }

    uploadFile = (gameId, event) => {
        if (event.target.files.length == 0) {
            return;
        }
        const file = event.target.files[0];
        if (!validTypeFiles.find(type => type === file.type)) {
            console.log("Error file file");
        }

        GameService.uploadMainImage(gameId, true, file).then((res) => {
            console.log(res);
            this.window.reload();
        }).catch (error => {
            window.location.replace("/access-denied");
        })
    }

    uploadMultiFile = (gameId, event) => {
        if (event.target.files.length == 0) {
            return;
        }
        const files = event.target.files;
        console.log(files)
        for (let i = 0; i < files.length; i++) {
            if (!validTypeFiles.find(type => type === files[i].type)) {
                console.log("Error file file");
                return;
            }
        }

        GameService.uploadCoverImage(gameId, false, files).then((res) => {
            console.log(res);
            return;
            // this.window.reload();
        }).catch (error => {
            console.log(error)
            // window.location.replace("/access-denied");
        })
    }

    render() {
        const {games, val} = this.state;
        const {currentPage, gamesPerPage } = this.state;
        const totalPages = this.state.totalPages;
        return (
            <div className="flex-col-align-center">
                <h2 className="text-center">Games List</h2>
                <div style={{ width: "80%" }}>
                    <div>
                        <Container triggerText={"Add game"} onClick={this.onSubmit} onSubmit={this.addGame} filledValue={gameNull}>
                        </Container>       
                        <div style={{ float: "left" }}>

                        </div>
                        <div style={{ float: "right" }}>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search"
                                    name="search"
                                    className={"info-border bg-dark text-white"}
                                    value={val}
                                    onChange={this.inputSearch}
                                    onKeyDown={this.handleKeyPress}
                                />
                                <FormGroup>
                                    <Button
                                        variant="outline-info"
                                        type="button"
                                        onClick={this.doFilter}
                                    ><FontAwesomeIcon icon={faSearch} /></Button>


                                    <Button
                                        variant="outline-danger"
                                        type="button"
                                        onClick={this.cancelSearch}
                                    >
                                        <FontAwesomeIcon icon={faTimes} /></Button>
                                </FormGroup>
                            </InputGroup>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Name </th>
                                    <th> Type </th>
                                    <th> Description </th>
                                    <th> Release Date </th>
                                    <th> Release Location </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.games.map(
                                        game =>
                                            <tr key={game.gameId}>
                                                <td style={{ width: "4%" }}> {game.gameId} </td>
                                                <td style={{ width: "8%" }}> {game.gameName} </td>
                                                <td style={{ width: "8%" }}> {game.gameType} </td>
                                                <td style={{ width: "40%" }}> {game.gameDescription} </td>
                                                <td style={{ width: "10%" }}>  {this.convertToDate(game.releaseDate)} </td>
                                                <td style={{ width: "10%" }}>  {game.releaseLocation} </td>
                                                <td style={{ width: "16%" }}>
                                                    <Container triggerText={"Update"} onSubmit={(e) => this.editGame(game.gameId, e)} filledValue={game} className="btn btn-info">Update </Container>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteGame(game.gameId)} className="btn btn-danger">Delete </button>
                                                    <div className="form-group">
                                                        <label htmlFor="image"> Game image </label>
                                                        <input style={{opacity: 1, display: "block"}} id='file' type='file' onChange={(e) => this.uploadFile(game.gameId, e)}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="cover-image"> Cover images </label>
                                                        <input style={{opacity: 1, display: "block", marginBottom: "10px" }} onChange={(e) => this.uploadMultiFile(game.gameId, e)} type="file" id="files" name="files" multiple/>
                                                    </div>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {games.length > 0 ? (
                            <Card.Footer>
                                <div style={{ float: "left" }}>
                                    Showing Page {currentPage} of {totalPages}
                                </div>
                                <div style={{ float: "right" }}>
                                    <InputGroup size="sm">

                                        <Button
                                            type="button"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}
                                        >
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button
                                            type="button"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}
                                        >
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>

                                        <input
                                            id="input-page"
                                            type="text"
                                            className="page-num"
                                            name="currentPage"
                                            value={this.state.currentPage}
                                        ></input>

                                        <Button
                                            type="button"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}
                                        >
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button
                                            type="button"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}
                                        >
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>

                                    </InputGroup>
                                </div>
                            </Card.Footer>
                        ) : null}
                    </div>
                </div>

            </div>
        )
    }
}

export default ListGameComponent
