import MarkdownRenderer from "./MarkdownRenderer";
import { useState } from "react";
import toast from 'react-hot-toast';
import TextInput from "./TextInput";
import {useRouter} from "next/navigation";
import Subscribe from "@/components/Subscribe";
import {  CrossmintProvider, CrossmintCheckoutProvider } from "@crossmint/client-sdk-react-ui";
import FadeLoader from "react-spinners/FadeLoader";
function Playground({
    filterList,
    setFilterList,
    waitingAnswer,
    theme,
    askQuestion,
    inputRef,
    waitingRef,
    email,
    loadingContent
}) {

    const [query, setQuery] = useState('');
    const router = useRouter();
    const copyAnswer = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy!');
        }
    }
    const setVerifyOpen = (index, position) => {
        const scrollContainer = document.querySelector('.scrollbar-neutral-800');
        const scrollPosition = scrollContainer.scrollTop;

        if (position == 'top') {
            setFilterList(prevList =>
                prevList.map((item, i) =>
                    i === index ? { ...item, verify_top_open: !item.verify_top_open } : item
                )
            );
        }
        if (position == 'bottom') {
            setFilterList(prevList =>
                prevList.map((item, i) =>
                    i === index ? { ...item, verify_bottom_open: !item.verify_bottom_open } : item
                )
            );
        }
        setTimeout(() => {
            scrollContainer.scrollTop = scrollPosition;
        }, 0);
    };

    const linkToProduct = (url) => {
        window.open(url, '_blank');
    }

    return loadingContent ? <div align="center" style={{marginTop: '200px'}}>
            <FadeLoader loading={loadingContent} height={15} />
        </div>:
        <div className={`flex-1 flex flex-col overflow-y-auto`}>
        <div className={`overflow-y-auto scrollbar-neutral-800 ${filterList.length ? 'flex-1' : ''}`}>
            {filterList.map((item, index) => {
                if (item.type == 'question') {
                    return (
                        <div key={index} className="mx-auto flex flex-1 gap-4 md:max-w-3xl">
                            <div className="w-full px-4 py-4">
                                <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                                    <div className="relative max-w-[var(--user-chat-width,70%)] rounded-3xl py-2.5 text-2xl"
                                        style={{ color: theme === "light" ? "black" : "white" }}
                                    >
                                        {item.text}
                                        {
                                            item.text != "" && <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else if (item.type == 'answer') {
                    return (
                        <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                            {<div className="flex flex-col mx-4 dark:text-white text-xl my-6">
                                <div className="flex items-center gap-2 mt-6">
                                    <img src="/image/verify.png" alt="verify" className="w-[20]" />
                                    <span className="font-semibold"
                                        style={{ color: theme === "light" ? "black" : "white" }}
                                    >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.level == 'Easy' ? 3 : item.level == 'Medium' ? 5 : 7} models</span>
                                    <img src={`/image/${item.verify_top_open ? "cancel_button" : "down"}.png`} alt="top"
                                        className={`w-[30px] h-[30px] cursor-pointer`}
                                        onClick={() => setVerifyOpen(index, 'top')} />
                                    {
                                        <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)} />
                                    }
                                </div>
                                {item.verify_top_open && <div className="[display:ruby] font-semibold mt-4">
                                    {item.status_report.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 mr-2">
                                            <span style={{ color: theme === "light" ? "black" : "white" }}>{item.model}</span>
                                            {item.status === 'success' ? (
                                                <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success" />
                                            ) : (
                                                <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed" />
                                            )}
                                        </div>
                                    ))}
                                </div>}
                                {item.verify_top_open && <span className="mt-4 text-2xl">
                                    <MarkdownRenderer content={item.opinion} color={theme} />
                                    <div align="center">
                                        {
                                            <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                                onClick={() => {
                                                    setVerifyOpen(index, "top")
                                                }}
                                            />
                                        }
                                    </div>
                                </span>}
                            </div>}
                            {
                                !item.close &&
                                <div className="mx-4 px-4 py-4 shadow-[10px_-10px_black] bg-[#FEFBF0] rounded-[30px]">
                                    <MarkdownRenderer content={item.text} color={theme} bg={true} />
                                </div>
                            }
                            {<div className="flex flex-col mx-4 dark:text-white text-xl">
                                <div className="flex items-center gap-2 mt-6">
                                    <img src="/image/verify.png" alt="verify" className="w-[20]" />
                                    <span className="font-semibold"
                                        style={{ color: theme === "light" ? "black" : "white" }}
                                    >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.level == 'Easy' ? 3 : item.level == 'Medium' ? 5 : 7} models</span>
                                    
                                    <img src={`/image/${item.verify_bottom_open ? "cancel_button" : "down"}.png`} alt="down"
                                        className={`w-[30px] h-[30px] cursor-pointer`}
                                        onClick={() => setVerifyOpen(index, 'bottom')} />
                                    <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)} />
                                </div>
                                {item.verify_bottom_open && <div className="[display:ruby] font-semibold mt-4">
                                    {item.status_report.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 mr-2">
                                            <span
                                                style={{ color: theme === "light" ? "black" : "white" }}
                                            >{item.model}</span>
                                            {item.status === 'success' ? (
                                                <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success" />
                                            ) : (
                                                <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed" />
                                            )}
                                        </div>
                                    ))}
                                </div>}
                                {item.verify_bottom_open && <span className="mt-4 text-2xl"
                                    style={{ color: theme === "light" ? "black" : "white" }}
                                >
                                    <MarkdownRenderer content={item.opinion} color={theme} />
                                    <div align="center">
                                        {
                                            <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                                onClick={() => {
                                                    setVerifyOpen(index, "bottom")
                                                }}
                                            />
                                        }
                                    </div>
                                </span>}
                            </div>}
                        </div>
                    )
                } else if (item.type == 'compare_product') {
                    return (
                        <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                            {<div className="flex flex-col mx-4 dark:text-white text-xl my-6">
                                <div className="flex items-center gap-2 mt-6">
                                    <img src="/image/verify.png" alt="verify" className="w-[20]" />
                                    <span
                                        className="font-semibold"
                                        style={{ color: theme === "light" ? "black" : "white" }}
                                    >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.status_report.length} models</span>
                                    <img src={`/image/${item.verify_top_open ? "cancel_button" : "down"}.png`} alt="top"
                                        className={`w-[30px] h-[30px] cursor-pointer`}
                                        onClick={() => setVerifyOpen(index, 'top')} />
                                    <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)} />
                                </div>
                                {item.verify_top_open && <div className="[display:ruby] font-semibold mt-4">
                                    {item.status_report.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 mr-2">
                                            <span
                                                style={{ color: theme === "light" ? "black" : "white" }}
                                            >{item.model}</span>
                                            {item.status === 'success' ? (
                                                <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success" />
                                            ) : (
                                                <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed" />
                                            )}
                                        </div>
                                    ))}
                                </div>}
                                {item.verify_top_open && <span className="mt-4 text-2xl">
                                    <MarkdownRenderer content={item.opinion} color={theme} />
                                    <div align="center">
                                        {
                                            <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                                onClick={() => {
                                                    setVerifyOpen(index, "top")
                                                }}
                                            />
                                        }
                                    </div>
                                </span>}
                            </div>}
                            {
                                !item.close &&
                                <div className="mx-4 px-4 py-4 shadow-[10px_-10px_black] bg-[#FEFBF0] rounded-[30px]">
                                    <MarkdownRenderer content={item.text} color={theme} bg={true} />
                                    <div
                                        className="text-2xl">Here {item.product.length > 1 ? 'are the products' : 'is the product'}:
                                    </div>
                                    <div
                                        className="w-full px-4 py-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-items-center">
                                        {item.product.map((product, id) => {
                                            return (
                                                <ProductSlider
                                                    id={id}
                                                    key={id}
                                                    product={product}
                                                    linkToProduct={linkToProduct}
                                                    data={{
                                                        main: product.image,
                                                        thumbnails: product.thumbnails
                                                    }}
                                                />
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            }
                            {<div className="flex flex-col mx-4 dark:text-white text-xl">
                                <div className="flex items-center gap-2 mt-6">
                                    <img src="/image/verify.png" alt="verify" className="w-[20]" />
                                    <span className="font-semibold"
                                        style={{ color: theme === "light" ? "black" : "white" }}
                                    >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.status_report.length} models</span>
                                    <img src={`/image/${item.verify_bottom_open ? "cancel_button" : "down"}.png`} alt="top"
                                        className={`w-[30px] h-[30px] cursor-pointer`}
                                        onClick={() => setVerifyOpen(index, 'bottom')} />
                                    <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)} />
                                </div>
                                {item.verify_bottom_open && <div className="[display:ruby] font-semibold mt-4">
                                    {item.status_report.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 mr-2">
                                            <span style={{ color: theme === "light" ? "black" : "white" }}>{item.model}</span>
                                            {item.status === 'success' ? (
                                                <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success" />
                                            ) : (
                                                <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed" />
                                            )}
                                        </div>
                                    ))}
                                </div>}
                                {item.verify_bottom_open && <span className="mt-4 text-2xl">
                                    <MarkdownRenderer content={item.opinion} color={theme} />
                                    <div align="center">

                                        <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                            onClick={() => {
                                                setVerifyOpen(index, "bottom")
                                            }}
                                        />
                                    </div>
                                </span>}
                            </div>}
                        </div>
                    )
                } else if (item.type == "general_product") {
                    return (
                        <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                            <div className="px-8 text-2xl mb-4 dark:text-white" style={{ color: theme === "light" ? "dark" : "white" }}>
                                Certainly! Here are some options picked for you
                            </div>
                            <div
                                className="w-full px-4 py-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
                                {item.product.map((product, id) => {
                                    return (
                                        <div
                                            key={id}
                                            className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
                                            onClick={() => linkToProduct(product.url)}
                                        >
                                            <div className="flex justify-center w-full">
                                                <img
                                                    src={product.image}
                                                    alt="product"
                                                    className="max-w-[200px] max-h-[200px] pt-3"
                                                />
                                            </div>
                                            <div className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.price}</div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className="px-8 text-2xl mt-4 dark:text-white" style={{ color: theme === "light" ? "dark" : "white" }}>
                                You can also browse & shop from the Boom Marketplace <a link='#'
                                    className="underline cursor-pointer"
                                    onClick={() => router.push('/marketplace')}>here</a>
                            </div>
                        </div>
                    )
                } else if (item.type == "subscribe") {
                    return <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4"><div className="mx-4 px-4 py-4 shadow-[10px_-10px_black] bg-[#FEFBF0] rounded-[30px]">
                        <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY}>
                            <CrossmintCheckoutProvider>
                                <Subscribe key={index} email={email}/>
                            </CrossmintCheckoutProvider>
                        </CrossmintProvider>
                    </div>
                    </div>
                } else {
                    return (
                        <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                            <div className="px-8 text-2xl mb-4 dark:text-white">
                                Certainly! Here it is:
                            </div>
                            {/* First Product (Single Row) */}
                            {item.product.length > 0 && (
                                <ProductSlider
                                    id={id}
                                    key={id}
                                    product={product}
                                    linkToProduct={linkToProduct}
                                    data={{
                                        main: product.image,
                                        thumbnails: product.thumbnails
                                    }}
                                />
                            )}
                            <div className="px-8 text-2xl mb-4 dark:text-white">
                                And here are alternatives to choose from:
                            </div>
                            {/* Remaining Products (Grid) */}
                            {item.product.length > 1 && (
                                <div
                                    className="w-full px-4 py-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                                    {item.product.slice(1).map((product, id) => (
                                        <div
                                            key={id}
                                            className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
                                            onClick={() => linkToProduct(product.url)}
                                        >
                                            <div className="flex justify-center w-full">
                                                <img
                                                    src={product.image}
                                                    alt="product"
                                                    className="max-w-[200px] max-h-[200px] pt-3"
                                                />
                                            </div>
                                            <div
                                                className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.price}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="px-8 text-2xl mt-4 dark:text-white">
                                You can also browse & shop from the Boom Marketplace <a link='#'
                                    className="underline cursor-pointer"
                                    onClick={() => router.push('/marketplace')}>here</a>
                            </div>
                        </div>
                    )
                }
            })}
            {waitingAnswer && <div className="mx-auto flex flex-col flex-1 md:max-w-3xl my-4">
                <div className="mx-4 py-4 flex text-2xl">
                    <img src="/image/logo.png" alt="logo" className="w-[30] mr-2" />
                    <span style={{ color: theme === "light" ? "dark" : "white" }}>
                        Consulting the council
                    </span>
                    <span className="ml-2 flex">
                        <span className="dot dot1" style={{ color: theme === "light" ? "dark" : "white" }}>.</span>
                        <span className="dot dot2" style={{ color: theme === "light" ? "dark" : "white" }}>.</span>
                        <span className="dot dot3" style={{ color: theme === "light" ? "dark" : "white" }}>.</span>
                    </span>
                    <style jsx>{`
                  .dot {
                    animation: bounce 1.5s infinite;
                    font-size: 2rem;
                    line-height: 1;
                    margin-top: -4px;
                  }

                  .dot1 {
                    animation-delay: 0s;
                  }

                  .dot2 {
                    animation-delay: 0.2s;
                  }

                  .dot3 {
                    animation-delay: 0.4s;
                  }

                  @keyframes bounce {
                    0%, 80%, 100% {
                      transform: scale(1);
                      opacity: 0.5;
                    }
                    40% {
                      transform: scale(1.4);
                      opacity: 1;
                    }
                  }
                `}</style>
                </div>
            </div>}
            <div ref={waitingRef}></div>
        </div>
        <div className={`flex mx-auto px-3 md:px-4 w-full pb-6 ${filterList.length ? '' : 'flex-1'}`}>
            <div
                className="mx-auto flex flex-col flex-1 gap-4 md:gap-5 lg:gap-6 md:max-w-3xl xl:max-w-[48rem] justify-center items-center">
                {!filterList.length && (
                    <div className="flex flex-col items-center">
                        <span className="text-[60px]"
                            style={{ color: theme === "light" ? "black" : "white" }}
                        >Welcome to Geneva</span>
                        <span className="text-3xl my-15"
                            style={{ color: theme === "light" ? "black" : "white" }}
                        >We intelligently unify AIs to give you high-quality, trusted answers & smarter discovery</span>
                    </div>
                )}
                <TextInput 
                    askQuestion={askQuestion}
                    inputRef={inputRef}
                    waitingAnswer={waitingAnswer}
                />
            </div>
        </div>
    </div>
}


function ProductSlider({ data, linkToProduct, id, product }) {
    const [index, setIndex] = useState(0);
    return <div
      className="flex align-center gap-[15] items-center"
    >
      {
        data.thumbnails && data.thumbnails.length > 1 &&
        <div>
          <img src={`/image/dark-left.png`} width={20} height={20}
            onClick={() => {
              setIndex(prevIndex => (prevIndex + 1) % data.thumbnails.length);
            }}
            className="cursor-pointer"
          />
        </div>
      }
      <div
        key={id}
        className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
        onClick={() => linkToProduct(product.url)}
      >
        <div
          className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.title}</div>
        <div className="flex justify-center w-full">
          {
            data.thumbnails && data.thumbnails.length > 1 ?
              <div className="flex gap-[15] align-center">
                <img
                  src={data.thumbnails[index]}
                  alt="product"
                  className="max-w-[200px] max-h-[200px] pt-3"
                />
              </div> :
              <img
                src={data.main}
                alt="product"
                className="max-w-[200px] max-h-[200px] pt-3"
              />
          }
        </div>
        <div
          className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.price}</div>
      </div>
      {
        data.thumbnails && data.thumbnails.length > 1 &&
        <div>
          <img src={`/image/dark-right.png`} width={20} height={20}
            className="cursor-pointer"
            onClick={() => {
              setIndex(prevIndex => (prevIndex - 1) % data.thumbnails.length);
            }}
          />
        </div>
      }
    </div>
  }

export default Playground;
