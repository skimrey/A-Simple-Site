import React from 'react'
import Input from './Input'
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';
import { useDispatch, useStore } from 'react-redux';
import { chooseName, chooseEmail, chooseAddress, choosePhone } from '../redux/slices/RootSlice';

interface ContactFormProps {
  id?: string[]
}

const ContactForm = (props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id, data)
      console.log(`Updated: ${ data.title } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()
    } else {
      // Use dispatch to update our state in our store
      dispatch(chooseName(data.title));
      dispatch(chooseEmail(data.author));
      dispatch(chooseAddress(data.pageCount));
      dispatch(choosePhone(data.publisher));

      server_calls.create(store.getState())
     
    }
    
  }

  
  return (

    // TODO - add handle function
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">
            title
          </label>
          <Input {...register('title')} name='title' placeholder="title"></Input>
        </div>
        <div>
          <label htmlFor="author">
            author
          </label>
          <Input {...register('author')} name='author' placeholder="author"></Input>
        </div>
        <div>
          <label htmlFor="publisher">
          publisher
          </label>
          <Input {...register('publisher')} name='publisher' placeholder="publisher"></Input>
        </div>
        <div>
          <label htmlFor="pageCount">
            pageCount
          </label>
          <Input {...register('pageCount')} name='pageCount' placeholder="pageCount"></Input>
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white">
          <input type="submit" value="Submit" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm