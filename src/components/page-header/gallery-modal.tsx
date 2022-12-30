import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { RMPSave } from '../../util/save';

export const GalleryModal = (props: {
    isOpen: boolean;
    handleOpenTemplates: (rmpSave: RMPSave) => void;
    onClose: () => void;
}) => {
    const { isOpen, handleOpenTemplates, onClose } = props;
    const { t } = useTranslation();

    const handleSelect = async (name: string) => {
        const module = await import(/* webpackChunkName: "template" */ `../../saves/${name}.json`);
        handleOpenTemplates(module.default as RMPSave);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('header.open.gallery')}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack>
                        {['shanghai', 'guangzhou', 'beijing', 'santiago'].map(city => (
                            <Button key={city} minWidth={200} onClick={() => handleSelect(city)}>
                                {t(`header.open.${city}`)}
                            </Button>
                        ))}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
