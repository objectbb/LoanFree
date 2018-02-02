import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

function renderInput(inputProps) {
    const { onClear, classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <div>
      <FormControl
           className={classes.textField}
        >
          <Input
              autoFocus={autoFocus}
              className={classes.textField}
              value={value}
              inputRef={ref}
              { ...other}
              inputProps={{
                classes: {
                  input: classes.input,
                }
              }}
        endAdornment={<InputAdornment  onClick={onClear} position="end">X</InputAdornment>}
          />
        </FormControl>

    </div>
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.text, query);
    const parts = parse(suggestion.text, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
      <div >
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300, fontSize: '12px' }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500, fontSize: '12px'  }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
      {children}
    </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.text;
}

function getSuggestions(value, suggestions) {

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {

            const keep =
                count < 5 && suggestion.text.toLowerCase().includes(inputValue)

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        maxHeight: 200,
        width: '100%'
    },
    suggestionsContainerOpen: {
        position: 'relative',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 999999999
    },
    suggestion: {
        display: 'block',
        width: '100%'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        width: '100%'
    },
    textField: {
        width: '100%',
        fontSize: '13px'
    },
});

class IntegrationAutosuggest extends React.Component {

    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
        };
    }

    componentWillReceiveProps() {
        this.setState({
            value: ''
        });
    }

    handleSuggestionSelected = () => {
        this.props.clearSelected()
        this.setState({
            value: ''
        });
        this.handleSuggestionsClearRequested()
    };

    handleSuggestionsFetchRequested = ({ value }) => {

        this.setState({
            suggestions: getSuggestions(value, this.props.data),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    render() {
        const { classes, oc } = this.props;

        return (
            <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: oc.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={(item) => getSuggestionValue(item, this.props.handleUpdateInput(item))}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: this.props.placeholder,
          value: this.state.value,
          onChange: this.handleChange,
          onClear: this.handleSuggestionSelected
        }}
      />
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);