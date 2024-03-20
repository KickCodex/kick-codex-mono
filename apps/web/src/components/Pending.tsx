import { FC, PropsWithChildren } from 'react';
import { Placeholder } from 'react-bootstrap';
import { PlaceholderProps } from 'react-bootstrap/Placeholder';

type PendingProps = {
    data?: any;
    placeHolderProps: PlaceholderProps;
    innerPlaceHolderProps?: PlaceholderProps;
};
const Pending: FC<PropsWithChildren<PendingProps>> = ({ data, children, placeHolderProps, innerPlaceHolderProps }) => {
    return data ? (
        children
    ) : (
        <Placeholder animation="glow" {...placeHolderProps}>
            <Placeholder xs={2} {...innerPlaceHolderProps} />
        </Placeholder>
    );
};

export default Pending;
