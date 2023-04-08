import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default class SuccessAlert extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          message: ''
        }
    }

    renderPage(props) {
        let message = props.message
        return (
            <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success" sx={{ whiteSpace: 'pre-line' }}>
                    <AlertTitle> Success </AlertTitle>
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