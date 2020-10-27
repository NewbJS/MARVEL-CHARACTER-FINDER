import React, { Component } from "react";

import "./Form.css";

interface Character {
  id: number;
  name: string;
  description: string;
  events: any;
  modified: string;
  comics: any;
  resourceURI: string;
  series: any;
  stories: any;
  thumbnail: any;
  urls: any[];
}

interface State {
  field: string;
  final: Character[];
}

interface Props {}

interface FormClass {
  state: State;
}

export default class Form extends Component<Props, State> implements FormClass {
  private constructor(props: Props) {
    super(props);
    this.state = {
      field: "",
      final: [],
    };
  }

  private handleChange = (event: any): void => {
    event.preventDefault();
    event.persist();
    this.setState({ field: event.target.value });
  };

  private handleSubmit = (event: any): void => {
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?name=" +
        this.state.field +
        "&apikey=b48ba2026b914d5aa32bb13028f220ea",
      requestOptions
    )
      .then((res: any) => {
        return res.json();
      })
      .then((data: any) => {
        if (data.data.results[0].name) {
          this.setState({ final: data.data.results });
        }
      })
      .catch(() => {
        alert("Could not find that character.");
      });
    this.setState({
      field: "",
    });
  };

  public render() {
    return (
      <>
        <small>To search for a character, enter a name. If there are two words in the name, make sure to put a dash between both words. For example, "Spider-Man".</small>
        <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="field">Type in a Marvel character</label>
          <br />
          <input
            type="text"
            value={this.state.field}
            name="field"
            onChange={this.handleChange}
            className="form-input"
          />
          <br />
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
        {this.state.final.map((character: Character) => {
          return (
            <div key={character.id} className="char-info">
              <h1>{character.name}</h1>
              <p>{character.description}</p>
              <h2>Five comics:</h2>
              <p>{character.comics.items[0].name}</p>
              <p>{character.comics.items[1].name}</p>
              <p>{character.comics.items[2].name}</p>
              <p>{character.comics.items[3].name}</p>
              <p>{character.comics.items[4].name}</p>
            </div>
          );
        })}
      </>
    );
  }
}
