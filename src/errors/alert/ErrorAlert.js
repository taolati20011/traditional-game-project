import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default class ErrorAlert extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          message: ''
        }
    }

    renderPage(props) {
        let message = props.message
        console.log(message)
        return (
            <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>
                    <AlertTitle> Error </AlertTitle>
                    {message}
                </Alert>
            </Stack>
            </div>
        );
    }

    render() {
        return this.renderPage(this.props);
    }
}