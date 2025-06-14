PGDMP  )                    }            books_db    17.5    17.4     )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            ,           1262    25110    books_db    DATABASE     |   CREATE DATABASE books_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE books_db;
                     postgres    false            �            1259    25112    book    TABLE     �   CREATE TABLE public.book (
    id integer NOT NULL,
    title character varying NOT NULL,
    author character varying NOT NULL,
    price integer NOT NULL,
    description character varying,
    image character varying
);
    DROP TABLE public.book;
       public         heap r       postgres    false            �            1259    25111    book_id_seq    SEQUENCE     �   CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.book_id_seq;
       public               postgres    false    218            -           0    0    book_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;
          public               postgres    false    217            �            1259    25121 	   feedbacks    TABLE     �   CREATE TABLE public.feedbacks (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.feedbacks;
       public         heap r       postgres    false            �            1259    25120    feedbacks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.feedbacks_id_seq;
       public               postgres    false    220            .           0    0    feedbacks_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;
          public               postgres    false    219            �           2604    25115    book id    DEFAULT     b   ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);
 6   ALTER TABLE public.book ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            �           2604    25124    feedbacks id    DEFAULT     l   ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);
 ;   ALTER TABLE public.feedbacks ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            $          0    25112    book 
   TABLE DATA           L   COPY public.book (id, title, author, price, description, image) FROM stdin;
    public               postgres    false    218   >       &          0    25121 	   feedbacks 
   TABLE DATA           J   COPY public.feedbacks (id, name, email, message, "createdAt") FROM stdin;
    public               postgres    false    220   u       /           0    0    book_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.book_id_seq', 36, true);
          public               postgres    false    217            0           0    0    feedbacks_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.feedbacks_id_seq', 40, true);
          public               postgres    false    219            �           2606    25129 (   feedbacks PK_79affc530fdd838a9f1e0cc30be 
   CONSTRAINT     h   ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.feedbacks DROP CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be";
       public                 postgres    false    220            �           2606    25119 #   book PK_a3afef72ec8f80e6e5c310b28a4 
   CONSTRAINT     c   ALTER TABLE ONLY public.book
    ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.book DROP CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4";
       public                 postgres    false    218            $   '  x��W�n�V]S_��E^^���A7��(��X�)l�pv�]'-��q�E�q����d�ԋ��{��sf�Xv�["yy�9gΌ��1�����d�)\31��8��M�5g�ll�vk��c�53Z���kF�0C�v���df��5��^�ң�����̰�Y�A��˫v�5���v��<m�����?5��ͭ��[�͍��v}������k�������[����O=��a�^���u{�F�����`�hǜPh9ⷻ�RX9�EgR��D��O�ȜS�׼e���å�H�	��=FT���'c�4IL�L�.=���)������}�+$$�C��^�h�t觋		�X90R���-�~�% �Q�c�Q�c<'tě�2�%إ@��g,F�藾�C�MW���$�>�*9K}"@�k`@��c���i�q�I�DA��P��� �5't�����~f��0��!\�]s\=#Q4pTC4�a�c���@����nqj�X�c���1�#��IE�;h�N9x�nɾ�^����
�f�h=��*x܊���(�[�f�=�|��D�J��AA^���|�������I�!a����@*]\AH>�}񄞙��U�ͬ��9���&�]I�:�_/������EVc�Q���r�B��-K��3h�Z�f�QY�ҧK�X�W�y�(x���}�c���+�u��P}*T�,�L"gǾ���9�A�8�"���Q�Q�9�F�I@�1ܕ����˦[Ɍ�4�U����4�O���
��U�X�I�,�K 8�;�&�
�����*X�j�U�9�Ȳ��$�V���VŻ�����O�R��	eq�7Q��C��i:�oސ���!{��t]�"3DX��a�uxx�-���n^bQ�%_I��[�_�u�U�RO�(hđ��j���GR@:���}�H�/�z�G���G�����Z�퐽�j	�
}���q;�{�+,\䔟�N%�4�U�`�wƩ����НU�2����o0�g��{���1O���[��
KA��$��"(�`�Qi-���طP#b�b��)�M+��b[fe����f9��r�wJ)�o^]��݅���5��K����������8��ԯtݮ�!��H*X7�T�eS.�T�FΝX&�C�% �]���F����`uUͫ�M*�S���ؤ#�Hf	�����D?�Qc02a�
�u\�oɸ�J�T9.*�`�аMy��+Nin�ʥ���#4�r����.�ώ!}�j.��ǧ)-����ew�Ŋk^�Ο����^���*��      &      x������ � �     