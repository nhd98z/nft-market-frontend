import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';



function OfferDiaglog(props) {
    const { onClose, selectedValue, open, listOffer } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>List Offer</DialogTitle>
            <List sx={{ pt: 0 }}>
                {listOffer.map((offer) => (
                    <ListItem button >
                        <ListItemText primary= {`${offer.asker.slice(0, 10)}...${offer.asker.slice(offer.asker.length - 8, offer.asker.length)} at block ${offer.blockTime}` }
                         secondary ={`${offer.amount} ETH` } 
                         />
                    </ListItem>
                ))}

            </List>
        </Dialog>
    );
}
export default OfferDiaglog
OfferDiaglog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    listOffer: PropTypes.array.isRequired,
};