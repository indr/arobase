## Arobase

http://jexhson.github.io/arobase/

Arobase is a simple and lightweight email obfuscator library for modern browsers.


## Basic Usage

Before you try anything, you need to include `arobase.min.js` in your page, via the usual tags:

~~~html
<script src="arobase.min.js" async></script>
~~~

Then you can obfuscate an email address by simply adding a class `arobase` to an element:

~~~html
<address class="arobase">john.doe</address>
~~~

This will render a clickable email like `john.doe@<current_page_domain>`.

## Options

Options are set using HTML attributes (such as `data-host`). All options can be
combined together.

### Mailbox

To customize the mailbox (the part before `@`) just add a `data-mailbox`. It
allows you to set a custom text if JavaScript is disable.

~~~html
<address class="arobase" data-mailbox="john.doe">
    Oops JS not activated
</address>
~~~

This will render as previously.

### Domain

To set a custom domain (the part just after `@` but before the last `.`) just
add a `data-domain`.

~~~html
<address class="arobase" data-domain="example">
    john.doe
</address>
~~~

This will render an email like `john.doe@example.<current_tld>`.

If current page have not top level domain (like `localhost`), the dot and the
tld parts are skipped.


### Top level domain (tld)

To set a custom top level domain (like `.com` or `.net`) just add a `data-tld`.

~~~html
<address class="arobase" data-tld="foo">john.doe</address>
~~~

This will render an email like `john.doe@<current_domain>.foo`.

## License

Arobase is released under the MIT License. See [LICENSE][1] file for
details.

## Links

The official site for the library is at <http://jexhson.github.io/arobase/>.


[1]: https://github.com/jexhson/arobase/blob/master/LICENSE
