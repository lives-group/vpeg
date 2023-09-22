#lang racket/base
(require web-server/formlets
         web-server/http
         web-server/http/response-structs
         web-server/http/request-structs
         web-server/servlet-env
         web-server/servlet
         racket/list
         web-server/dispatch
         web-server/templates
         racket/string
         racket/function
         racket/file
         xml)
(require json)


; file-upload-formlet: formlet (binding?)
(define file-upload-formlet
  (formlet
   (div ,{(file-upload) . => . binds})
   ; returns the file name and contents:
   (let
       ([fname (bytes->string/utf-8 (binding:file-filename binds))]
        [fcontents (binding:file-content binds)])
     (values fname fcontents))))


;read fcontents as json expr
#;(define (read-file-to-json fcontents)
  ;(with-input-from-file fcontents (λ () (read-json)))
  (bytes->jsexpr fcontents))


; show-page: request -> doesn't return
(define (show-page request)
  
  ; Response generator
  (define (response-generator embed/url)
    (response/xexpr
     `(html 
       ,(render-header request)
       (p ((class "textarea-title")) "Write your PEG")
       (textarea ((placeholder "Your PEG")))
       (p ((class "textarea-title")) "Or upload your PEG")
       (form 
        ([action ,(embed/url upload-handler)]
         [method "POST"]
         [enctype "multipart/form-data"])
        ,@(formlet-display file-upload-formlet)
        (input ([type "submit"] [value "Debug"]))))))

  (define (upload-handler request)
    (define-values (fname fcontents)
      (formlet-process file-upload-formlet request))

    (define file-contents-string 
      (bytes->string/utf-8 fcontents))
    
    (current-directory (build-path ".."))
    
    ;(define save-name (string-append "!uploaded-" fname))
    ;(display-to-file fcontents save-name #:exists 'replace) - não estamos salvando o arquivo

    (response/xexpr
     `(html
       (head
        (title "VPeg - Execution")
        (meta ((charset "UTF-8")))
        (meta ((name "viewport") (content "width=device-width, initial-scale=1.0, maximum-scale=1.0")))
        (link
         ((rel "stylesheet")
          (href "style.css")
          (type "text/css"))))
       (body
        (h2 "File name")
        (p ,fname)
        (h2 "File content")
        (p ,file-contents-string)))))

  (send/suspend/dispatch response-generator))


; To generate html from json
(define (render-html-json x y)
  `(div
    (p (string-append "x: " ,x))
    (p (string-append "y: " ,y))))


; html head
(define (render-header request)
  `(head
    (title "VPeg")
    (meta ((charset "UTF-8")))
    (meta ((name "viewport") (content "width=device-width, initial-scale=1.0, maximum-scale=1.0")))
    (link ((rel "stylesheet")
           (href "style.css")
           (type "text/css")))
    ,(render-navigationbar request)))


; render navigation bar
(define (render-navigationbar request)
  `(body 
    (div ((class "header"))
     (a ((class "logo")) "VPeg")
     (div ((class "header-right"))
      (a ((href "output-debug.html")) "Home ")
      (a "Online Version ")
      (a "Documentation ")
      (a "Development")))))


; Dispatchs
(define-values (dispatcher url-generator)
  (dispatch-rules
   [("") show-page]))


; The entry point
(module+ main
  (serve/servlet
   dispatcher
   #:port 6995
   #:command-line? #f
   ;#:file-not-found-responder not-found
   #:launch-browser? #f
   #:servlet-regexp #rx""
    #:extra-files-paths
    (list
     (build-path "../css")
     (build-path "../js")
     (build-path "../pages"))))