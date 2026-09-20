import { animatorApiCalls } from '@/api/animator/apiCalls';
import type {DeleteBilanEntry, StudentEntry } from '@/api/animator/seances.types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

const DeleteBilanDialog = ({studentBilan, onBilanDeleted} : {studentBilan : StudentEntry, onBilanDeleted : (bilan : DeleteBilanEntry) => void}) => {
    const bilanId = studentBilan.bilan?.id

    const deleteMutation = useMutation({
        mutationFn: () =>
            animatorApiCalls.deleteBilan({bilanId : studentBilan.bilan!.id}),
        onSuccess: (bilan) => {
            if(!bilan){
                toast.error('Erreur lors de la suppression du bilan.');
                return;
            }
            onBilanDeleted(bilan);
            toast.success(`Bilan de ${studentBilan.firstName} supprimé !`)
            console.log('bilan supprimé : ', bilan)
        },
        onError: () => toast.error('Erreur lors de la mise à jour du bilan.'),
    })

    if (!bilanId) return null;
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className='h-10 w-10'><Trash2Icon/></Button>
        </DialogTrigger>
        <DialogContent className='rounded-xl min-w-72 min-h-56 flex flex-col'>
                <DialogHeader className='flex-1 items-center justify-center'>
                    <DialogTitle className='text-lg'>Supprimer le bilan</DialogTitle>
                    <DialogDescription>Etes-vous sûr de vouloir supprimer le bilan?</DialogDescription>
                </DialogHeader>
                
                <DialogFooter className='flex flex-row'>
                    <DialogClose className='flex-1' asChild>
                        <Button variant={'outline'}>Non</Button>
                    </DialogClose>
                    <Button
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate()} 
                        className='flex-1'   
                    >
                        {deleteMutation.isPending ? 'Suppression...' : 'Oui'}
                    </Button>
                </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteBilanDialog